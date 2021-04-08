import { useState } from 'react'
import Router from 'next/router'
import {
  TextField,
  Button,
  CssBaseline,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  makeStyles,
  Grid
} from "@material-ui/core";
import OpenShelfSnackbar from '@/components/snackbar'

const useStyles = makeStyles((theme) => ({
  bookFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(5)
  },
  submitBtn: {
    marginTop: theme.spacing(2)
  }
}));

export default function BookForm() {
  const [isbnSearch, setIsbnSearch] = useState('')
  const [isbnResult, setIsbnResult] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [physicalFormat, setPhysicalFormat] = useState('')
  const [numberOfPages, setNumberOfPages] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [detailsURL, setDetailsURL] = useState('')
  const [genres, setGenres] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const ISBN = isbnSearch
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          ISBN,
          physicalFormat,
          numberOfPages,
          imageURL,
          detailsURL,
          description,
          genres
        })
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/me/books')
    } catch (e) {
      console.log(e?.message)
    }
  }

  const handleISBNSearch = async () => {
    setIsbnResult(null)
    const result = await fetch(`/api/isbn/${isbnSearch}`);
    if (result.status === 400) {
      return setOpen(true);
    }
    const book = await result.json();
    if (book) {
      setImageURL(`https://covers.openlibrary.org/b/id/${book?.details?.covers?.[0]}-L.jpg`)
      const imgRes = await fetch(`https://covers.openlibrary.org/b/id/${book?.details?.covers?.[0]}-L.jpg`)

      if (imgRes.status !== 200) {
        setImageURL('')
      }
      if (book?.description) {
        setDescription(book?.description)
      }
      if (book?.subjects) {
        const genreString = book?.subjects.join()
        setGenres(genreString)
      }
      setIsbnResult(book)
      setTitle(book?.details?.title)
      setAuthor(book?.details?.authors?.[0]?.name)
      setDetailsURL(book?.info_url)
      let format = book?.details?.physical_format
      if (format) {
        format = format.charAt(0).toUpperCase() + format.slice(1)
      }
      setPhysicalFormat(format)
      setNumberOfPages(book?.details?.number_of_pages)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <Container className={classes.bookFormContainer} component="main" maxWidth="sm">
        <CssBaseline />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel htmlFor="search-isbn">ISBN *</InputLabel>
          <OutlinedInput
            autoFocus
            id="search-isbn"
            required
            type="text"
            value={isbnSearch}
            labelWidth={50}
            onChange={(e) => {
              setOpen(false)
              setIsbnSearch(e.target.value)
            }}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={async () => await handleISBNSearch()} variant="contained">Autofill</Button>
              </InputAdornment>
            }
          />
        </FormControl>
        {imageURL && <img src={imageURL} />}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              autoComplete="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="author"
              label="Author"
              value={author}
              name="author"
              autoComplete="author"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="physicalFormat"
              label="Physical Format"
              name="physicalFormat"
              value={physicalFormat}
              autoComplete="physicalFormat"
              onChange={(e) => setPhysicalFormat(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="numberOfPages"
              label="Number of Pages"
              value={numberOfPages}
              name="numberOfPages"
              autoComplete="numberOfPages"
              onChange={(e) => setNumberOfPages(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={5}
              id="description"
              label="Description"
              value={description}
              name="description"
              autoComplete="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={5}
              id="genres"
              label="Genres (Separated by commas)"
              value={genres}
              name="genres"
              autoComplete="genres"
              onChange={(e) => setGenres(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button className={classes.submitBtn} fullWidth variant="contained" disabled={submitting} type="submit">
          {submitting ? 'Creating ...' : 'Create'}
        </Button>
      </Container>
      <OpenShelfSnackbar
        message={`Could not autofill for ISBN ${isbnSearch}`}
        open={open}
        handleClose={handleClose}
      />
    </form>
  )
}

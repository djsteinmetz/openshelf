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
  IconButton,
  makeStyles,
  Grid
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  bookFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
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
  const [submitting, setSubmitting] = useState(false)
  const classes = useStyles()

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const ISBN = isbnResult?.details?.isbn_13?.[0]
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
          imageURL
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
    const book = await result.json();
    console.log({ book })
    if (book) {
      setImageURL(`http://covers.openlibrary.org/b/isbn/${isbnSearch}-M.jpg`)
      const imgRes = await fetch(`http://covers.openlibrary.org/b/isbn/${isbnSearch}-M.jpg`)
      if (imgRes.status !== 200) {
        setImageURL('')
      }
      setIsbnResult(book)
      setTitle(book?.details?.title)
      setAuthor(book?.details?.authors?.[0]?.name)
      let format = book?.details?.physical_format
      if (format) {
        format = format.charAt(0).toUpperCase() + format.slice(1)
      }
      setPhysicalFormat(format)
      setNumberOfPages(book?.details?.number_of_pages)
      console.log(title, author, physicalFormat, format, numberOfPages, imageURL)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <Container className={classes.bookFormContainer} component="main" maxWidth="sm">
        <CssBaseline />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel htmlFor="search-isbn">Autofill by ISBN</InputLabel>
          <OutlinedInput
            autoFocus
            id="search-isbn"
            type="text"
            value={isbnSearch}
            labelWidth={115}
            onChange={(e) => setIsbnSearch(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  onClick={async () => await handleISBNSearch()}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {isbnSearch && ((isbnResult?.details?.isbn_13?.[0] || isbnResult?.details?.isbn_10?.[0]) === isbnSearch) && <img src={`http://covers.openlibrary.org/b/isbn/${isbnSearch}-M.jpg`} />}
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
        </Grid>
        <Button className={classes.submitBtn} fullWidth variant="contained" disabled={submitting} type="submit">
          {submitting ? 'Creating ...' : 'Create'}
        </Button>
      </Container>
    </form>
  )
}

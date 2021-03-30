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
  makeStyles
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  bookFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

export default function BookForm() {
  const [isbnSearch, setIsbnSearch] = useState('')
  const [isbnResult, setIsbnResult] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const classes = useStyles()

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          description,
          genre,
        }),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      throw Error(e.message)
    }
  }

  const handleISBNSearch = async () => {
    setIsbnResult(null)
    const result = await fetch(`/api/isbn/${isbnSearch}`);
    const book = await result.json();
    console.log({ book })
    if (book) {
      setIsbnResult(book)
      setTitle(book?.details?.title)
      setAuthor(book?.details?.authors?.[0]?.name)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <Container className={classes.bookFormContainer} component="main" maxWidth="sm">
        <CssBaseline />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel htmlFor="search-isbn">Autofill by ISBN</InputLabel>
          <OutlinedInput
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
        {isbnSearch && (isbnResult?.details?.isbn_13?.[0] === isbnSearch) && <img src={`http://covers.openlibrary.org/b/isbn/${isbnResult?.details?.isbn_13?.[0]}-M.jpg`} />}

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
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
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
        {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          multiline
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
        <Button fullWidth variant="contained" disabled={submitting} type="submit">
          {submitting ? 'Creating ...' : 'Create'}
        </Button>
      </Container>
    </form>
  )
}

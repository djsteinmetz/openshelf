import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import { useBook } from '@/lib/swr-hooks'
import ActionButtonContainer from '../action-button-container'

export default function BookForm() {
  const [_title, setTitle] = useState('')
  const [_author, setAuthor] = useState('')
  const [_description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const { data: book } = useBook(id as string)

  const resetFields = (): void => {
    setTitle(book?.Title)
    setAuthor(book?.Author)
    setDescription(book?.Description)
  }

  useEffect(() => {
    if (!book) {
      Router.push('/login')
    }
    resetFields()
  }, [book])

  const areChanges = (): boolean => {
    console.log(book?.Title, _title)
    console.log(book?.Author, _author)
    console.log(book?.Description, _description)
    if (book?.Title !== _title) return true
    if (book?.Author !== _author) return true
    if (book?.Description !== _description) return true
    return false
  }

  const submitHandler = async (e): Promise<void> => {
    e.preventDefault()
    const patch: any = {}
    if (book?.Title !== _title) {
      patch.Title = _title === '' ? null : _title
    }
    if (book?.Author !== _author) {
      patch.Author = _author === '' ? null : _author
    }
    if (book?.Description !== _description) {
      patch.Description = _description === '' ? null : _description
    }
    setSubmitting(true)
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patch),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) console.log(json.message)
      Router.push(`/books/${id}`)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="my-4">
        <label htmlFor="title">
          <h3 className="font-bold">Title</h3>
        </label>
        <input
          id="title"
          className="shadow border rounded w-full py-2 px-3"
          type="text"
          name="title"
          value={_title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="author">
          <h3 className="font-bold">Author</h3>
        </label>
        <input
          id="author"
          className="shadow border rounded w-full py-2 px-3"
          type="text"
          name="author"
          value={_author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="description">
          <h3 className="font-bold">Description</h3>
        </label>
        <textarea
          className="shadow border resize-none focus:shadow-outline w-full h-48 py-2 px-3"
          id="description"
          name="description"
          value={_description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <ActionButtonContainer>
        <Button disabled={submitting || !areChanges()} type="submit" variant="contained">
          {submitting ? 'Saving ...' : 'Save Changes'}
        </Button>
        {areChanges() && (
          <Button onClick={() => resetFields()}>Discard Changes</Button>
        )}
      </ActionButtonContainer>
    </form>
  )
}

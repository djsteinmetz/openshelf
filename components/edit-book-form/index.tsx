import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import Button from '../button'

export default function BookForm() {
  const [_title, setTitle] = useState('')
  const [_author, setAuthor] = useState('')
  const [_description, setDescription] = useState('')
  const [_genre, setGenre] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { id, title, author, description, genre } = router.query

  useEffect(() => {
    if (typeof title === 'string') {
      setTitle(title)
    }
    if (typeof author === 'string') {
      setAuthor(author)
    }
    if (typeof description === 'string') {
      setDescription(description)
    }
    if (typeof genre === 'string') {
      setGenre(genre)
    }
  }, [title, author, description, genre])

  async function submitHandler(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/edit-book', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: _title,
        }),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) console.log(json.message)
      Router.push('/')
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
        <label htmlFor="genre">
          <h3 className="font-bold">Genre</h3>
        </label>
        <select
          id="genre"
          className="shadow border rounded w-full py-2 px-3"
          name="genre"
          value={_genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value={null}>Choose a genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Young Adult">Young Adult</option>
          <option value="Other">Other</option>
        </select>
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
      <Button disabled={submitting} type="submit">
        {submitting ? 'Saving ...' : 'Save'}
      </Button>
    </form>
  )
}

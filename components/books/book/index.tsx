import { useEffect, useState } from 'react'
import Link from 'next/link'
import { mutate } from 'swr'
import cookie from 'cookie'
import ButtonLink from '@/components/button-link'
import Button from '@/components/button'
import { isAdminUser } from 'helpers/auth.helpers'

function Book({ id, title, author, description, genre, owner }) {
  const [deleting, setDeleting] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies["liblst.access_token"];
    const _isAdmin = isAdminUser(token);
    setIsAdmin(_isAdmin);
  });

  async function deleteBook() {
    setDeleting(true)
    let res = await fetch(`/api/delete-book?id=${id}`, { method: 'DELETE' })
    let json = await res.json()
    if (!res.ok) throw Error(json.message)
    mutate('/api/books')
    setDeleting(false)
  }
  return (
    <div>
      <div className="flex items-center">
        <Link href={`/bookshelf/${id}`}>
          <a className="font-bold py-2">{title} by {author}</a>
        </Link>
        {isAdmin && (
          <div className="flex ml-4">
            <ButtonLink
              href={`/bookshelf/edit/${id}?title=${title}&author=${author}&description=${description}&genre=${genre}`}
              className="h-5 py-0 mx-1"
            >
              Edit
          </ButtonLink>
            <Button
              disabled={deleting}
              onClick={deleteBook}
              className="h-5 py-0 mx-1"
            >
              {deleting ? 'Deleting ...' : 'Delete'}
            </Button>
          </div>
        )}
      </div>
      <p>{description}</p>
      <p>{owner}</p>
    </div>
  )
}

export default Book

import Router, { useRouter } from 'next/router'

import { useBook } from '@/lib/swr-hooks'
import Container from '@/components/container'
import { UserContext } from '@/lib/user-context'
import Button from '@material-ui/core/Button'
import React, { useContext } from 'react'
import Link from 'next/link'

const handleDelete = async (id: string): Promise<void> => {
  try {
    await fetch(`/api/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    Router.push('/me/books')
  } catch (e) {
    console.log({e})
  }
}

export default function EditBookPage() {
  const router = useRouter()
  const route = router.basePath
  const id = router.query.id?.toString()
  const { data } = useBook(id)
  const { user } = useContext(UserContext)

  if (data) {
    return (
      <>
        <Container>
          <h1 className="font-bold text-3xl my-2">{data.Title} by {data.Author}</h1>
          <p>{data.Description}</p>
          <div className="flex justify-between mt-4">
            {data.DetailsURL && <Button variant="contained"><a href={data.DetailsURL} target="_blank">More Details</a></Button>}
            {data?.OwnerID === user?.ID && (
              <Button onClick={() => handleDelete(data?.interopID)}>Delete</Button>
            )}
          </div>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <Container>
          <h1 className="font-bold text-3xl my-2">...</h1>
          <p>...</p>
        </Container>
      </>
    )
  }
}

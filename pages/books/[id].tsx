import Router, { useRouter } from 'next/router'

import { useBook } from '@/lib/swr-hooks'
import Container from '@/components/container'
import Nav from '@/components/nav'
import { UserContext } from '@/lib/user-context'
import React, { useContext } from 'react'
import Button from '@/components/button'

const handleDelete = async (id: string): Promise<void> => {
  try {
    console.log('going to delete')
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
  console.log(route)
  const id = router.query.id?.toString()
  const { data } = useBook(id)
  const { user } = useContext(UserContext)

  if (data) {
    return (
      <>
        <Container>
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl my-2">{data.Title} by {data.Author}</h1>
            {data?.OwnerID === user?.ID && (
              <Button onClick={() => handleDelete(data?.interopID)}>Delete</Button>
            )}
          </div>
          <p>{data.Description}</p>
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

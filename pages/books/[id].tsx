import { useRouter } from 'next/router'

import { useBook } from '@/lib/swr-hooks'
import Container from '@/components/container'
import Nav from '@/components/nav'

export default function EditBookPage() {
  const router = useRouter()
  const id = router.query.id?.toString()
  console.log(id)
  const { data } = useBook(id)

  if (data) {
    return (
      <>
        <Container>
          <h1 className="font-bold text-3xl my-2">{data.Title} by {data.Author}</h1>
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

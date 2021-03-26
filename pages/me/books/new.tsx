import Container from '@/components/container'
import BookForm from '@/components/book-form'

export default function NewBookPage() {
  return (
    <>
      <Container className="w-full lg:w-2/4">
        <BookForm />
      </Container>
    </>
  )
}
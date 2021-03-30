import { Container } from '@material-ui/core'
import BookForm from '@/components/book-form'

export default function NewBookPage() {
  return (
    <Container className="mt-6 flex justify-center">
      <BookForm />
    </Container>
  )
}
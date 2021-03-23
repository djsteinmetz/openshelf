import Skeleton from 'react-loading-skeleton'

import Container from '@/components/container'
import Books from '@/components/books'

import { useBooks } from '@/lib/swr-hooks'
import React from 'react'

export default function Bookshelf() {
  const { books, isLoading } = useBooks()

  if (isLoading) {
    return (
      <div>
        <Container>
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
        </Container>
      </div>
    )
  }

  return (
    <Container className="mt-8">
      <Books books={books} />
    </Container>
  )
}
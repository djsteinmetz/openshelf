import Skeleton from 'react-loading-skeleton'

import Container from '@/components/container'
import Books from '@/components/books'

import { useMyBooks } from '@/lib/swr-hooks'
import React from 'react'
import { useSearch } from '@/lib/search'

export default function Bookshelf() {
  const { search } = useSearch()
  const { books, isLoading } = useMyBooks(search)

  if (isLoading) {
    return (
      <div>
        <Container className="mt-6">
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
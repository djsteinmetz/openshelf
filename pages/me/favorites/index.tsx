import Skeleton from 'react-loading-skeleton'

import Container from '@/components/container'
import Books from '@/components/books'

import React, { useContext } from 'react'
import { UserContext } from '@/lib/user-context'

export default function MyFavorites() {
  const { userFavorites, isLoading } = useContext(UserContext)

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
      <Books books={userFavorites} />
    </Container>
  )
}
import Skeleton from 'react-loading-skeleton'

import Container from '@/components/container'
import Books from '@/components/books'

import { useBooks } from '@/lib/swr-hooks'
import { NextPageContext } from 'next'
import { parseCookies } from 'helpers/cookie.helpers'
import { isLoggedIn } from 'helpers/auth.helpers'
import Router from 'next/router'
import { useEffect } from 'react'
import React from 'react'

export default function IndexPage({isLoggedIn}) {
  console.log({isLoggedIn})
  const [loggedIn, setLoggedIn] = React.useState(false)
  const { books, isLoading } = useBooks()

  useEffect(() => {
    if (!isLoggedIn) {
      Router.push('/login');
    }
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  if (isLoading || !loggedIn) {
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
    <div>
      <Container>
        <Books books={books} />
      </Container>
    </div>
  )
}

IndexPage.getInitialProps = (ctx: NextPageContext) => {
  const cookies = parseCookies(ctx)
  console.log({cookies})
  const token = cookies['booklical.access_token'];
  console.log({token})
  const authorized = isLoggedIn(token);
  return { isLoggedIn: authorized };
}
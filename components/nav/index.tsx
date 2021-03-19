import Link from 'next/link'
import Container from '@/components/container'
import ButtonLink from '@/components/button-link'
import Cookies from 'js-cookie'
import Router from 'next/router'
import React, { useEffect } from 'react'
import cookie from 'cookie'
import { isLoggedIn } from 'helpers/auth.helpers'

export default function Nav() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie)
    const token = cookies['bookster.access_token'];
    const authorized = isLoggedIn(token);
    setLoggedIn(authorized);
  }, [isLoggedIn]);
  
  const handleLogout = () => {
    Cookies.remove("bookster.access_token", {
      path: "/",
    });
    Router.push('/login');
  };

  return (
    <Container className="py-4">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-3xl">Bookish</a>
          </Link>
          {loggedIn && <ButtonLink href="/new">New Entry</ButtonLink>}
        </div>
      </nav>
    </Container>
  )
}
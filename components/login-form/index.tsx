import { useState } from 'react'
import Router from 'next/router'
import Cookies from "js-cookie";
import Button from '@/components/button'
import { TokenResponse } from 'models/token-response.interface'

export default function LoginForm() {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const setAuthCookie = async (token: string) => {
    Cookies.set("bookster.access_token", token, {
      path: "/",
    });
  }

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email,
          Password,
        }),
      })
      setSubmitting(false)
      const json: TokenResponse = await res.json()
      if (!res.ok) throw Error('Something went wrong')
      if (json && json?.access_token) {
          console.log('cookie being set')
        await setAuthCookie(json.access_token);
        Router.push('/')
      }
    } catch (e) {
        console.log('something went wrong with the login')
      throw Error(e.message)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="my-4 mx-auto">
        <label htmlFor="Email">
          <h3 className="font-bold">Email</h3>
        </label>
        <input
          id="Email"
          className="shadow border rounded w-2/4 py-2"
          type="text"
          name="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="my-4 mx-auto">
        <label htmlFor="Password">
          <h3 className="font-bold">Password</h3>
        </label>
        <input
          id="Password"
          className="shadow border rounded w-2/4 py-2"
          type="text"
          name="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'Logging In ...' : 'Log In'}
      </Button>
    </form>
  )
}

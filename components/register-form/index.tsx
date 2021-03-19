import { useState } from 'react'
import Router from 'next/router'

import Button from '@/components/button'

export default function RegisterForm() {
  const [ID, setID] = useState('')
  const [FullName, setFullName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID,
          FullName,
          Email,
          Password,
        }),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="my-4 mx-auto">
        <label htmlFor="FullName">
          <h3 className="font-bold">Full Name</h3>
        </label>
        <input
          id="FullName"
          className="shadow border rounded w-2/4 py-2"
          type="text"
          name="FullName"
          value={FullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
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
        <label htmlFor="Username">
          <h3 className="font-bold">Username</h3>
        </label>
        <input
          id="Username"
          className="shadow border rounded w-2/4 py-2"
          type="text"
          name="Username"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="Password">
          <h3 className="font-bold">Password</h3>
        </label>
        <input
          className="shadow border rounded w-2/4 py-2"
          id="Password"
          type="password"
          name="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'Creating ...' : 'Create'}
      </Button>
    </form>
  )
}

import Container from '@/components/container'
import LogoHorizontal from '@/components/logo-horizontal'
import React from 'react'

export default function IndexPage() {

  return (
    <Container className="flex justify-center items-center h-screen">
      <div className="flex-col items-center">
        <LogoHorizontal classes="block"/>
        <p className="text-2xl text-center">Coming Soon</p>
      </div>
    </Container>
  )
}
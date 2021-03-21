import '../styles/index.css'
import Footer from '@/components/footer'
import Nav from '@/components/nav'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
    </head>
      {/* <Nav /> */}
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp

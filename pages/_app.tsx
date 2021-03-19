import '../styles/index.css'
import Footer from '@/components/footer'
import Nav from '@/components/nav'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp

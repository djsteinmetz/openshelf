import '../styles/index.css'
import Nav from '@/components/nav'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ProvideSearch } from '../lib/search'
import theme from '../styles/theme';
import Head from 'next/head'

function MyApp({ Component, pageProps, }) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ProvideSearch>
          <Nav />
          <Component {...pageProps} />
        </ProvideSearch>
      {/* <Footer /> */}
      </ThemeProvider>
    </>
  )
}

export default MyApp
function useProvideSearch(): { onSearch: any; search: any; } {
  throw new Error('Function not implemented.');
}


import '../styles/index.css'
import Nav from '@/components/nav'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ProvideSearch } from '../lib/search'
import theme from '../styles/theme';

function MyApp({ Component, pageProps, }) {
  return (
    <>
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


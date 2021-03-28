import '../styles/index.css'
import Nav from '@/components/nav'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ProvideSearch } from '../lib/search'
import theme from '../styles/theme';
import cookie from "cookie";
import { useEffect, useMemo, useState } from 'react';
import { UserContext } from '@/lib/user-context';
import { IUser } from 'models/users.interface';

function MyApp({ Component, pageProps, }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const value = useMemo(() => ({ user, setUser, loadingUser }), [user, setUser, loadingUser]);
  useEffect(() => {
    if (!user) {
      getUserFromCookies().then((user: IUser) => {
        setUser(user)
        setLoadingUser(false)
      })
    }
  });

  const getUserFromCookies = async (): Promise<IUser> => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies["bookstr.access_token"];
    if (!token) return null
    const getUser = await fetch(`/api/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await getUser.json() as IUser
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserContext.Provider value={value}>
          <ProvideSearch>
            <Nav />
            <Component {...pageProps} />
          </ProvideSearch>
        </UserContext.Provider>
      {/* <Footer /> */}
      </ThemeProvider>
    </>
  )
}

export default MyApp
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
import { IBook } from 'models/books.interface';

function MyApp({ Component, pageProps, }) {
  const [user, setUser] = useState(null);
  const [userFavorites, setUserFavorites] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true);
  const value = useMemo(() => ({ user, setUser, userFavorites, setUserFavorites, loadingUser }), [user, setUser, userFavorites, setUserFavorites, loadingUser]);
  useEffect(() => {
    if (!user) {
      getUserFromCookies().then((res: IResponse) => {
        if (res) {
          // Set initial state values
          setUser(res.user)
          setUserFavorites(res.favorites)
          setLoadingUser(false)
        }
      })
    }
  });

  interface IResponse {
    user: IUser,
    favorites: IBook[]
  }

  const getUserFromCookies = async (): Promise<IResponse> => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies["bookstr.access_token"];
    if (!token) {
      return null
    }
    const getUser = await fetch(`/api/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const getFavorites = await fetch(`/api/me/favorites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const u = await getUser.json() as IUser
    const f = await getFavorites.json() as IBook[]

    return {user: u, favorites: f}
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
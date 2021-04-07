import Skeleton from 'react-loading-skeleton'

import Container from '@/components/container'
import Books from '@/components/books'

import React, { useContext } from 'react'
import { UserContext } from '@/lib/user-context'
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import { Link } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nullFavorites: {
      color: theme.palette.grey[400],
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    '@media (max-width: 768px)': {
      nullFavorites: {
        textAlign: 'center'
      }
    }
  })
)
export default function MyFavorites() {
  const { userFavorites, isLoading } = useContext(UserContext)
  const classes = useStyles()

  if (isLoading) {
    return (
      <div>
        <Container className="mt-6">
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
        </Container>
      </div>
    )
  }

  return (
    <Container className="mt-8">
      <Books books={userFavorites} />
      {userFavorites?.length <= 0 && <Typography className={classes.nullFavorites}>Hmm, you haven't chosen any favorites.  <Link href="/books"><b>Explore books now!</b></Link></Typography>}
    </Container>
  )
}
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import moment from "moment";
import Link from "next/link";
import VerifiedIcon from "@material-ui/icons/CheckCircle";
import React, { useContext, useEffect, useState } from "react";
import FavoriteIcon from '@material-ui/icons/Favorite'
import { IconButton } from "@material-ui/core";
import { UserContext } from "@/lib/user-context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      marginBottom: theme.spacing(2),
    },
    mediaWrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    },
    media: {
      height: "10rem",
      width: "8rem",
      backgroundSize: "contain",
      marginBottom: theme.spacing(2),
    },
    cardContent: {
      padding: "0 16px 16px 16px",
    },
    cardBody: {
      display: "flex",
      flexDirection: 'column',
      textAlign: 'center'
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: theme.palette.secondary.light,
      width: '30px',
      height: '30px',
      fontSize: '0.75rem',
    },
    author: {
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    verified: {
      color: theme.palette.primary.main,
      fontSize: "1rem",
    },
    readMore: {
      cursor: "pointer",
      marginTop: theme.spacing(1),
    },
    description: {
      '--lh': '2rem',
      '--max-lines': 3,
      position: 'relative',
      maxHeight: 'calc(var(--lh) * var(--max-lines))',
      overflow: 'hidden',
      '&::after': {
        content: "''",
        textAlign: 'right',
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '50%',
        height: '1.2em',
        background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%)'
      }
    }
  })
);

export default function BookCard(props) {
  const { book, favorited } = props
  const { user, setUserFavorites } = useContext(UserContext)
  const classes = useStyles();
  const userInitials = book?.OwnerFullName?.split(" ")
    .map((s) => s.charAt(0))
    ?.join("");
  const dateAdded = moment(book.created_at, "YYYYMMDD").fromNow();

  const addFavorite = async (id: string) => {
    await fetch(`/api/me/favorites/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const getUserFavorites = await fetch(`/api/me/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userFavs = await getUserFavorites.json();
    setUserFavorites(userFavs);
  }

  const removeFavorite = async (id: string) => {
    try {
      await fetch(`/api/me/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const getUserFavorites = await fetch(`/api/me/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userFavs = await getUserFavorites.json();
      setUserFavorites(userFavs);
    } catch (e) {
      console.log({ e })
    }
  }

  return (
    book && (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                book?.OwnerVerified && (
                  <VerifiedIcon fontSize="small" className={classes.verified} />
                )
              }
            >
              <Avatar aria-label="book owner" className={classes.avatar}>
                {userInitials}
              </Avatar>
            </Badge>
          }
          action={
            user && (
              <IconButton onClick={async () => favorited ? removeFavorite(book.ID) : await addFavorite(book.ID)} aria-label="favorite">
                <FavoriteIcon color={favorited ? 'error' : 'disabled'} />
              </IconButton>
            )
          }
          title={book.OwnerFullName}
          subheader={`Added ${dateAdded}`}
        />
        <div className={classes.cardBody}>
          <div className={classes.mediaWrapper}>
            {book.ImageURL && (
              <CardMedia
                className={classes.media}
                image={book.ImageURL}
                title="Book Image"
              />
            )}
          </div>
          <CardContent className={classes.cardContent}>
            <Link href={`/books/[id]`} as={`/books/${book?.ID}`}>
              <Typography variant="h6" color="textSecondary" component="p">
                {book.Title}
              </Typography>
            </Link>
            <Typography
              className={classes.author}
              variant="body1"
              color="textSecondary"
              component="p"
            >
              {book.Author}
            </Typography>
            <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
              {book.Description}
            </Typography>
            <Link href={`/books/[id]`} as={`/books/${book?.ID}`}>
              <Typography
                className={classes.readMore}
                color="textSecondary"
                variant="body2"
              >
                Read More &gt;
              </Typography>
            </Link>
          </CardContent>
        </div>
      </Card>
    )
  );
}

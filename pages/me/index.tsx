import { UserContext } from "@/lib/user-context";
import { createStyles, makeStyles, Theme, Typography, Container, Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Router from 'next/router'
import Skeleton from "react-loading-skeleton";
import { getProfileGreeting } from "helpers/auth.helpers";
import Gravatar from 'react-gravatar'
import Books from "@/components/books";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: theme.palette.primary.dark
    },
    header: {
        height: '150px',
        backgroundColor: theme.palette.secondary.main
    },
    gravatar: {
        marginTop: theme.spacing(-7),
        borderRadius: '180px',
        border: `5px solid ${theme.palette.common.white}`
    },
    profileContainer: {
        display: 'flex',
    },
    profileInfo: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    editBtn: {
        display: 'block',
        marginLeft: theme.spacing(1)
    },
    username: {
        marginTop: 0,
        color: theme.palette.text.hint,
    },
    favoritesContainer: {
        marginTop: theme.spacing(5)
    },
    favoritesTitle: {
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.dark,
        textTransform: 'uppercase',
        fontWeight: 500,
        letterSpacing: '.05rem',
        fontSize: '1rem'
    }
  })
);

export default function Me() {
    const { user, userFavorites, loadingUser } = useContext(UserContext)
    const classes = useStyles()
    const [editingUser, setEditingUser] = useState(false)
    useEffect(() => {
        if (!user && !loadingUser) {
            Router.push('/login')
        }
    })

    if (loadingUser || !user) {
        return (
            <Container>
                <Skeleton width={250} height={250} style={{display: 'block'}}/>
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
                <div className="my-4" />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
                <div className="my-4" />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
            </Container>
        )
    }
    return (
        <>
            <div className={classes.header}></div>
            <Container>
                <div className={classes.profileContainer}>
                    {user.Email && <Gravatar className={classes.gravatar} size={150} default="identicon" email={user?.Email} />}
                    {!editingUser && (
                        <div className={classes.profileInfo}>
                            <Typography className={classes.name} variant="h1" >{user?.FullName}</Typography>
                            <Typography className={classes.username} variant="body1" >{user?.Username}</Typography>
                        </div>
                    )}
                </div>
            </Container>
            <Container className={classes.favoritesContainer}>
                <Typography className={classes.favoritesTitle} variant="h5">Your Favorites</Typography>
                <Books books={userFavorites} />
            </Container>
        </>
    )
}
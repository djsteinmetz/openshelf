import { UserContext } from "@/lib/user-context";
import { createStyles, makeStyles, Theme, Typography, Container, Button, TextField, IconButton, FormControl, InputLabel, Input, InputAdornment, Grid, OutlinedInput } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Router from 'next/router'
import Skeleton from "react-loading-skeleton";
import Gravatar from 'react-gravatar'
import Books from "@/components/books";
import EditIcon from '@material-ui/icons/Edit'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import Link from "next/link";
import ActionButtonContainer from "@/components/action-button-container";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        name: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: theme.palette.primary.dark,
            marginRight: theme.spacing(1),
        },
        header: {
            // Twice the height of the header bar
            height: '128px',
            backgroundColor: theme.palette.secondary.main
        },
        gravatar: {
            marginTop: theme.spacing(-7),
            borderRadius: '180px',
            width: '150px',
            height: '150px',
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
            marginTop: theme.spacing(-1.5),
            color: theme.palette.text.hint,
        },
        favoritesContainer: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5)
        },
        favoritesTitle: {
            marginBottom: theme.spacing(2),
            color: theme.palette.primary.dark,
            textTransform: 'uppercase',
            fontWeight: 500,
            letterSpacing: '.05rem',
            fontSize: '1rem'
        },
        profileForm: {
            display: 'block',
            width: '750px',
            marginLeft: theme.spacing(2),
        },
        profileInfoNameRow: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        socialIcons: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        instagramIcon: {
            display: 'block',
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(0.5),
            color: theme.palette.grey[400]
        },
        facebookIcon: {
            display: 'block',
            marginTop: theme.spacing(1),
            marginInline: theme.spacing(0.5),
            color: theme.palette.grey[400]
        },
        twitterIcon: {
            display: 'block',
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(0.5),
            color: theme.palette.grey[400]
        },
        nullFavorites: {
            color: theme.palette.grey[400],
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        editIcon: {},
        '@media (max-width: 768px)': {
            profileContainer: {
                flexDirection: 'column',
                alignItems: 'center'
            },
            profileInfo: {
                textAlign: 'center'
            },
            socialIcons: {
                justifyContent: 'center'
            },
            profileForm: {
                width: '100%',
                marginRight: theme.spacing(2)
            },
            editIcon: {
                marginRight: theme.spacing(-6)
            },
            header: {
                height: '75px',
            },
            favoritesContainer: {
                textAlign: 'center'
            },
        },
    })
);

export default function Me() {
    const { user, setUser, userFavorites, loadingUser } = useContext(UserContext)
    const classes = useStyles()
    const [editingUser, setEditingUser] = useState(false)
    const [savingChanges, setSavingChanges] = useState(false)
    const [fullName, setFullName] = useState(user?.FullName)
    const [InstagramUsername, setInstagramUsername] = useState(user?.InstagramUsername || null)
    const [FacebookUsername, setFacebookUsername] = useState(user?.FacebookUsername || null)
    const [TwitterUsername, setTwitterUsername] = useState(user?.TwitterUsername || null)
    const [TikTokUsername, setTikTokUsername] = useState(user?.TikTokUsername || null)

    const areChanges = (): boolean => {
        if (user?.FullName !== fullName) return true
        if (user?.InstagramUsername !== InstagramUsername) return true
        if (user?.FacebookUsername !== FacebookUsername) return true
        if (user?.TwitterUsername !== TwitterUsername) return true
        if (user?.TikTokUsername !== TikTokUsername) return true
        return false
    }

    const resetFields = (): void => {
        setFullName(user?.FullName)
        setInstagramUsername(user?.InstagramUsername)
        setFacebookUsername(user?.FacebookUsername)
        setTwitterUsername(user?.TwitterUsername)
        setTikTokUsername(user?.TikTokUsername)
    }

    useEffect(() => {
        if (!user && !loadingUser) {
            Router.push('/login')
        }
        resetFields()
    }, [user])

    const submitHandler = async (e): Promise<void> => {
        setSavingChanges(true)
        e.preventDefault()
        const patch: any = {}
        if (user?.FullName !== fullName) {
            patch.FullName = fullName === '' ? null : fullName
        }
        if (user?.InstagramUsername !== InstagramUsername) {
            patch.InstagramUsername = InstagramUsername === '' ? null : InstagramUsername
        }
        if (user?.FacebookUsername !== FacebookUsername) {
            patch.FacebookUsername = FacebookUsername === '' ? null : FacebookUsername
        }
        if (user?.TwitterUsername !== TwitterUsername) {
            patch.TwitterUsername = TwitterUsername === '' ? null : TwitterUsername
        }
        if (user?.TikTokUsername !== TikTokUsername) {
            patch.TikTokUsername = TikTokUsername === '' ? null : TikTokUsername
        }
        const userPatchReq = await fetch(`/api/users/${user?.ID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patch)
        })
        const userPatchRes = await userPatchReq.json()
        if (userPatchRes?.ID) {
            setUser(userPatchRes)
            setEditingUser(false)
            setSavingChanges(false)
        }
    }

    if (loadingUser || !user) {
        return (
            <Container>
                <Skeleton width={250} height={250} style={{ display: 'block' }} />
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
                            <div className={classes.profileInfoNameRow}>
                                <Typography className={classes.name} variant="h1" >{user?.FullName}</Typography>
                                <IconButton className={classes.editIcon} onClick={() => setEditingUser(true)} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </div>
                            <Typography className={classes.username} variant="body1" >{user?.Username}</Typography>
                            <div className={classes.socialIcons}>
                                {user?.InstagramUsername && <a className={classes.instagramIcon} href={`https://www.instagram.com/${user?.InstagramUsername}`} target="_blank"><InstagramIcon /></a>}
                                {user?.FacebookUsername && <a className={classes.facebookIcon} href={`https://www.facebook.com/${user?.FacebookUsername}`} target="_blank"><FacebookIcon /></a>}
                                {user?.TwitterUsername && <a className={classes.twitterIcon} href={`https://www.twitter.com/${user?.TwitterUsername}`} target="_blank"><TwitterIcon /></a>}
                            </div>
                        </div>
                    )}
                    {editingUser && (
                        <form className={classes.profileForm} onSubmit={submitHandler}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="fullname"
                                        label="Full Name"
                                        name="title"
                                        value={fullName}
                                        autoComplete="title"
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        value={user?.Username}
                                        autoComplete="username"
                                        helperText="Contact us to change your username."
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin="normal">
                                        <InputLabel htmlFor="instagram-url">Instagram username</InputLabel>
                                        <OutlinedInput
                                            id="instagram-url"
                                            labelWidth={155}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <InstagramIcon />
                                                </InputAdornment>
                                            }
                                            value={InstagramUsername}
                                            onChange={(e) => setInstagramUsername(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin="normal">
                                        <InputLabel htmlFor="facebook-url">Facebook username</InputLabel>
                                        <OutlinedInput
                                            id="facebook-url"
                                            labelWidth={155}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <FacebookIcon />
                                                </InputAdornment>
                                            }
                                            value={FacebookUsername}
                                            onChange={(e) => setFacebookUsername(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin="normal">
                                        <InputLabel htmlFor="twitter-url">Twitter username</InputLabel>
                                        <OutlinedInput
                                            id="twitter-url"
                                            labelWidth={130}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <TwitterIcon />
                                                </InputAdornment>
                                            }
                                            value={TwitterUsername}
                                            onChange={(e) => setTwitterUsername(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <ActionButtonContainer>
                                <Button disabled={!areChanges() || savingChanges} type="submit" variant="contained">{savingChanges ? 'Requesting changes ...' : 'Save Changes'}</Button>
                                <Button onClick={() => {
                                    resetFields()
                                    setEditingUser(false)
                                }}>{areChanges() ? 'Discard Changes' : 'Cancel'}</Button>
                            </ActionButtonContainer>
                        </form>
                    )}
                </div>
            </Container>
            <Container className={classes.favoritesContainer}>
                <Typography className={classes.favoritesTitle} variant="h5">Favorites</Typography>
                <Books books={userFavorites} />
                {userFavorites.length <= 0 && <Typography className={classes.nullFavorites}>Hmm, you haven't chosen any favorites.  <Link href="/books"><b>Explore books now!</b></Link></Typography>}
            </Container>
        </>
    )
}
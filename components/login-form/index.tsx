import React, { useContext, useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import { TokenResponse } from "models/token-response.interface";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  TextField,
  Button,
  makeStyles,
  Typography,
  Avatar,
  Container,
  CssBaseline,
} from "@material-ui/core";
import OpenShelfSnackbar from "../snackbar";
import { UserContext } from "@/lib/user-context";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { setUser, setUserFavorites } = useContext(UserContext);
  const classes = useStyles();

  const setAuthCookie = async (token: string) => {
    Cookies.set("openshelf.access_token", token, {
      path: "/",
    });
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function submitHandler(e) {
    setSubmitting(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username,
          Password,
        }),
      });
      setSubmitting(false);
      const json: TokenResponse = await res.json();

      if (res.status === 401) {
        setErrMessage("Incorrect Username or Password");
        setOpen(true);
      }
      if (json && json?.access_token) {
        await setAuthCookie(json.access_token);
        const getUser = await fetch(`/api/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await getUser.json();
        const getUserFavorites = await fetch(`/api/me/favorites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userFavs = await getUserFavorites.json();
        setUserFavorites(userFavs);
        Router.push("/");
      }
    } catch (e) {
      setErrMessage("Oops! Something went wrong.");
      setOpen(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={submitting}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {submitting ? "Logging In ..." : "Log In"}
          </Button>
        </form>
      </div>
      <OpenShelfSnackbar
        message={errMessage}
        open={open}
        handleClose={handleClose}
      />
    </Container>
  );
}

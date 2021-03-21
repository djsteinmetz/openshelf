import React, { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import { TokenResponse } from "models/token-response.interface";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  TextField,
  Button,
  Theme,
  makeStyles,
  createStyles,
  Typography,
  Avatar,
  Container,
  CssBaseline,
} from "@material-ui/core";

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
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const classes = useStyles();

  const setAuthCookie = async (token: string) => {
    Cookies.set("bookstr.access_token", token, {
      path: "/",
    });
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
          Email,
          Password,
        }),
      });
      setSubmitting(false);
      const json: TokenResponse = await res.json();
      if (!res.ok) throw Error("Something went wrong");
      if (json && json?.access_token) {
        console.log("cookie being set");
        await setAuthCookie(json.access_token).then(() => {
          Router.push("/");
        });
      }
    } catch (e) {
      console.log("something went wrong with the login");
      throw Error(e.message);
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
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
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
    </Container>
  );
}

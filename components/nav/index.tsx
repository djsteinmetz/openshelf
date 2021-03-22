import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import React, { useEffect } from "react";
import cookie from "cookie";
import { isAdminUser, isLoggedIn } from "helpers/auth.helpers";
import LogoHorizontal from "../logo-horizontal";
import LogoSquare from "../logo-square";
import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export default function Nav() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies["bookstr.access_token"];
    const authorized = isLoggedIn(token);
    const _isAdmin = isAdminUser(token);
    setLoggedIn(authorized);
    setIsAdmin(_isAdmin);
  });

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <div className="flex-grow">
            <LogoHorizontal classes="hidden md:block py-2 cursor-pointer" width="12em"/>
            <LogoSquare classes="block md:hidden curosr-pointer" />
          </div>
          {!loggedIn && (
            <div>
              <Link href="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </div>
          )}
          {loggedIn && (
            <div>
              <Link href="/new">
                <Button variant="contained" color="inherit">Add Book</Button>
              </Link>
              <Button
                onClick={() => {
                  Cookies.remove("bookstr.access_token", {
                    path: "/",
                  });
                  Router.push("/");
                }}
                color="inherit"
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

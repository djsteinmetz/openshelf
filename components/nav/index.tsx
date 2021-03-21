import Link from "next/link";
import ButtonLink from "@/components/button-link";
import Cookies from "js-cookie";
import Router from "next/router";
import React, { useEffect } from "react";
import cookie from "cookie";
import { isAdminUser, isLoggedIn } from "helpers/auth.helpers";
import ContainerFluid from "../container-fluid";
import LogoHorizontal from "../logo-horizontal";
import LogoSquare from "../logo-square";
import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "white",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "white",
    },
  })
);

export default function Nav() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    console.log("cookies from navigation index", cookies);
    const token = cookies["bookstr.access_token"];
    console.log("token from nav", token);
    const authorized = isLoggedIn(token);
    const _isAdmin = isAdminUser(token);
    setLoggedIn(authorized);
    setIsAdmin(_isAdmin);
  });

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <LogoHorizontal classes="hidden md:block" />
          <LogoSquare classes="block md:hidden" />
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
              <Button
                onClick={() => {
                  Cookies.remove("bookstr.access_token", {
                    path: "/",
                  });
                  Router.push("/login");
                }}
                color="inherit"
              >
                Logout
              </Button>
              <Link href="/new">
                <Button color="inherit">Add Book</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
    // <ContainerFluid className="bg-gray-200">
    //   <nav className="px-8 py-4">
    //     <div className="flex justify-between items-center">
    //       <Link href="/">
    //         <a className="font-bold text-3xl"><LogoHorizontal classes="hidden md:block"/><LogoSquare classes="block md:hidden"/> {isAdmin ? '| Admin' : ''}</a>
    //       </Link>
    //       {!loggedIn && (
    //         <div>
    //           <a
    //             className="bg-black text-white p-2 rounded uppercase text-sm font-bold ml-2 cursor-pointer"
    //             onClick={() => Router.push("/login")}
    //           >
    //             Login
    //           </a>
    //           <a
    //             className="bg-black text-white p-2 rounded uppercase text-sm font-bold ml-2 cursor-pointer"
    //             onClick={() => Router.push("/register")}
    //           >
    //             Register
    //           </a>
    //         </div>
    //       )}
    //       {loggedIn && (
    //         <div>
    //           <ButtonLink href="/new">Add Book</ButtonLink>
    //           <a
    //             className="text-gray-600 p-2 rounded uppercase text-sm font-bold ml-2 cursor-pointer"
    //             onClick={() => {
    //               Cookies.remove("bookstr.access_token", {
    //                 path: "/",
    //               });
    //               Router.push("/login");
    //             }}
    //           >
    //             Logout
    //           </a>
    //         </div>
    //       )}
    //     </div>
    //   </nav>
    // </ContainerFluid>
  );
}

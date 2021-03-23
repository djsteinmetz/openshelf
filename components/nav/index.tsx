import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import React, { useEffect } from "react";
import cookie from "cookie";
import { isAdminUser, isLoggedIn } from "helpers/auth.helpers";
import LogoHorizontal from "../logo-horizontal";
import LogoSquare from "../logo-square";
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies["bookstr.access_token"];
    const authorized = isLoggedIn(token);
    const _isAdmin = isAdminUser(token);
    setLoggedIn(authorized);
    setIsAdmin(_isAdmin);
  });
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={() => {
        handleMenuClose()
        Router.push('/new')
      }}>Add Book</MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose()
          Cookies.remove("bookstr.access_token", {
            path: "/",
          });
          Router.push("/");
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  )

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
            <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </MenuItem>
            // <div>
            //   <Link href="/new">
            //     <Button variant="contained" color="inherit">Add Book</Button>
            //   </Link>
            //   <Button
            //     onClick={() => {
            //       Cookies.remove("bookstr.access_token", {
            //         path: "/",
            //       });
            //       Router.push("/");
            //     }}
            //     color="inherit"
            //   >
            //     Logout
            //   </Button>
            // </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

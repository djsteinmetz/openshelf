import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
import cookie from "cookie";
import { getInitials, getProfileGreeting, isAdminUser, isLoggedIn } from "helpers/auth.helpers";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/LibraryBooks";
import Gravatar from 'react-gravatar'
import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  fade,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  debounce,
} from "@material-ui/core";
import { useSearch } from "@/lib/search";
import { UserContext } from "@/lib/user-context";
import Logo from "../logo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    siteTitle: {
      fontWeight: 600,
      cursor: 'pointer',
    },
    appBar: {
      backgroundColor: theme.palette.common.white,
    },
    branding: {
      fontWeight: "bold",
      cursor: "pointer",
      marginRight: theme.spacing(2),
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    search: {
      position: "relative",
      color: theme.palette.grey[900],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.secondary.main, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.secondary.main, 0.25),
      },
      // marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "35ch",
        },
      },
    },
    list: {
      width: "auto",
    },
    avatar: {
      backgroundColor: theme.palette.secondary.contrastText,
    }
  })
);

export default function Nav() {
  const { search, setSearch, onSearch } = useSearch();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, setUser, setUserFavorites, loadingUser } = useContext(UserContext);
  const [
    mobileAnchorEl,
    setMobileAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const menuId = "primary-search-account-menu";
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies["liblst.access_token"];
    const authorized = isLoggedIn(token);
    const _isAdmin = isAdminUser(token);
    setLoggedIn(authorized);
    setIsAdmin(_isAdmin);
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {loggedIn && !loadingUser && (
        <div>
          <MenuItem disabled>
            {`${getProfileGreeting()}, ${user?.FullName?.split(' ')?.[0]}`}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              Router.push("/me");
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              Router.push("/me/books");
            }}
          >
            My Books
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              Router.push("/me/favorites");
            }}
          >
            My Favorites
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              Router.push("/me/books/new");
            }}
          >
            Add Book
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              Cookies.remove("liblst.access_token", {
                path: "/",
              });
              setUser(null);
              setUserFavorites(null)
              Router.push("/");
            }}
          >
            Logout
          </MenuItem>
        </div>
      )}
      {!loggedIn && (
        <div>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              Router.push("/login");
            }}
          >
            Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              Router.push("/register");
            }}
          >
            Register
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={1}>
        <Toolbar>
          <div className="block md:hidden">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="open drawer"
              onClick={(e) => setMobileAnchorEl(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Link href="/">
            <Typography className={classes.siteTitle} variant="h5" color="primary">LIBLST</Typography>
          </Link>
          <div className="hidden md:block">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Title or Author"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => debounce(onSearch(e), 1000)}
                value={search}
              />
            </div>
          </div>
          <div className="flex-grow"></div>
          {!loadingUser && (
            <IconButton
              onClick={handleMenuOpen}
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="primary"
            >
              {user?.ID ? (
                <Avatar className={classes.avatar}>
                  {user.Email && <Gravatar default="identicon" email={user?.Email} />}
                </Avatar>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          )}
        </Toolbar>
        <div className="block md:hidden">
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Title or Author"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  onSearch(e);
                }}
                value={search}
              />
            </div>
          </Toolbar>
        </div>
      </AppBar>
      {renderMenu}
      <Drawer
        className={classes.list}
        anchor="left"
        open={isMobileMenuOpen}
        onClose={() => setMobileAnchorEl(null)}
      >
        <List>
          <ListItem
            button
            onClick={() => {
              setMobileAnchorEl(null);
              Router.push("/");
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setMobileAnchorEl(null);
              Router.push("/books");
            }}
          >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Browse Books" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

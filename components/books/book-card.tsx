import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import moment from "moment";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      cursor: "pointer",
    },
    media: {
      height: "10rem",
      width: "auto",
      backgroundSize: "contain",
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
    },
    author: {
      fontWeight: "bold",
      marginBottom: "1rem",
    },
  })
);

export default function BookCard({ book }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const initial = book?.FullName?.charAt(0);
  const dateAdded = moment(book.created_at, "YYYYMMDD").fromNow();

  return (
    book && (
      <Grid item xs={12} md={4}>
        <Link href={`/books/[id]`} as={`/books/${book?.interopID}`}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {initial}
                </Avatar>
              }
              title={book.FullName}
              subheader={`Added ${dateAdded}`}
            />
            <CardMedia
              className={classes.media}
              image={book.ImageURL}
              title="Book Image"
            />
            <CardContent>
              <Typography variant="h5" color="textSecondary" component="p">
                {book.Title}
              </Typography>
              <Typography
                className={classes.author}
                variant="body1"
                color="textSecondary"
                component="p"
              >
                {book.Author}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {book.Description}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    )
  );
}

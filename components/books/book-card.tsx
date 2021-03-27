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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      marginBottom: theme.spacing(2),
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
      alignItems: "start",
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
    verified: {
      color: theme.palette.primary.main,
      fontSize: "1rem",
    },
    readMore: {
      cursor: "pointer",
      marginTop: theme.spacing(1),
    },
  })
);

export default function BookCard({ book }) {
  const classes = useStyles();
  const userInitials = book?.OwnerFullName?.split(" ")
    .map((s) => s.charAt(0))
    ?.join("");
  const dateAdded = moment(book.created_at, "YYYYMMDD").fromNow();

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
          title={book.OwnerFullName}
          subheader={`Added ${dateAdded}`}
        />
        <div className={classes.cardBody}>
          <div>
            {book.ImageURL && (
              <CardMedia
                className={classes.media}
                image={book.ImageURL}
                title="Book Image"
              />
            )}
          </div>
          <CardContent className={classes.cardContent}>
            <Link href={`/books/[id]`} as={`/books/${book?.interopID}`}>
              <Typography variant="h5" color="textSecondary" component="p">
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
            <Typography variant="body2" color="textSecondary" component="p">
              {book.Description}
            </Typography>
            <Link href={`/books/[id]`} as={`/books/${book?.interopID}`}>
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

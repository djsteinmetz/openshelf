import { UserContext } from "@/lib/user-context";
import { Grid } from "@material-ui/core";
import { IBook } from "models/books.interface";
import React, { useContext } from "react";
import BookCard from "./book-card";

export default function Books({ books }) {
  const { userFavorites, user, isLoading } = useContext(UserContext)

  return (
    <Grid container spacing={2}>
      {books?.map((b: IBook, i: number) => {
        const isFavorite = userFavorites?.filter(fb => fb.ID.toString() === b.ID.toString())?.length > 0
        return (
          <Grid key={i} item xs={12} sm={4} lg={3}>
            <BookCard book={b} favorited={isFavorite} />
          </Grid>
        )
      })}
    </Grid>
  )
}

import { Grid } from "@material-ui/core";
import { IBook } from "models/books.interface";
import React from "react";
import BookCard from "./book-card";

export default function Books({ books }) {
  return (
    <Grid container spacing={2}>
      {books?.map((b: IBook, i: number) => {
        return (
          <Grid item xs={12} sm={4} lg={3}>
            <BookCard key={i} book={b} />
          </Grid>
        )
      })}
    </Grid>
  )
}


import { IBook } from 'models/books.interface';
import React from 'react';
import Grid from '@material-ui/core/Grid'
import BookCard from './book-card';

export default function Books({books}) {
  return (
      books?.map((b: IBook, i: number) => <BookCard key={i} book={b} />)
  );
}
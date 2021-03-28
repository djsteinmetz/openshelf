import { NextPageContext } from "next";

export interface IBook {
    interopID: string;
    Title: string;
    Author: string;
    Description: string;
    Genre: string;
    OwnerID: string;
    OwnerFullName: string;
}

export interface IBooksListProps {
    booksList?: IBook[]
}

export interface IBookDetailsProps {
    book?: IBook
}

export interface IBooksDetailsPageContext extends NextPageContext {
    query: {
      bookID: string
    }
}
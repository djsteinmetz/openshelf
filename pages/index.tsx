import Container from "@/components/container";
import Books from "@/components/books";
import React from "react";
import { GetServerSideProps, NextPageContext } from "next";
import { IBook } from "models/books.interface";
import { query } from "@/lib/db";
import { useBooks } from "@/lib/swr-hooks";
import Skeleton from "react-loading-skeleton";

export default function IndexPage() {
  const { books, isLoading } = useBooks()

  if (isLoading) {
    return (
      <div>
        <Container>
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
        </Container>
      </div>
    )
  }

  return (
    <div>
      <Container className="mt-8">
        <Books books={books} />
      </Container>
    </div>
  )
}
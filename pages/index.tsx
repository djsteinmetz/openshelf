import Container from "@/components/container";
import Books from "@/components/books";
import React from "react";
import { useBooks } from "@/lib/swr-hooks";
import Skeleton from "react-loading-skeleton";
import { useSearch } from "@/lib/search";
import { Typography } from "@material-ui/core";

export default function IndexPage() {
  const { search } = useSearch()
  const { books, isLoading } = useBooks(search)

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
    <Container className="mt-8">
      {search && <Typography variant="h6">Results for: "{search}"</Typography>}
      <Books books={books} />
    </Container>
  )
}
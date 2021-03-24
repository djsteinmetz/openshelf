import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useBooks(searchTerm?: string) {
  if (searchTerm) {
    const urlEncodedSearchTerm = searchTerm.split(' ').join('%20')
    const { data, error } = useSWR(`/api/get-books?search=${urlEncodedSearchTerm}`, fetcher)
  
    return {
      books: data,
      isLoading: !error && !data,
      isError: error,
    }
  }
  const { data, error } = useSWR(`/api/get-books`, fetcher)

  return {
    books: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useBook(id: string) {
  return useSWR(`/api/get-book?id=${id}`, fetcher)
}

import Book from './book'

function Books({ books }) {
  if (books) {
    return (
      <div>
        {books.map((b) => (
          <div key={b.interopID} className="py-2">
            <Book id={b.interopID} title={b.Title}  author={b.Author} description={b.Description} genre={b.Genre} owner={b.FullName}/>
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Books

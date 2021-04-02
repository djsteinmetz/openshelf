import { NextApiHandler } from "next"
import fetch from 'isomorphic-unfetch'

const handler: NextApiHandler = async (req, res) => {
    const { isbn } = req.query
    const isbnResults = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`);
    const searchResults = await isbnResults.json();
    const book = searchResults[`ISBN:${isbn}`]
    let aggregated = null
    if (book) {
        aggregated = book;
        if (book?.details?.works?.[0]?.key) {
            const worksReq = await fetch(`https://openlibrary.org${book?.details?.works?.[0]?.key}.json`, { headers: { 'User-Agent': '*'}})
            const worksDetails = await worksReq.json();
            if (worksDetails?.covers) {
                book.details.covers = worksDetails.covers.filter(c => c !== -1)
            }
            if (worksDetails?.authors?.[0]?.author?.key) {
                const authorReq = await fetch(`https://openlibrary.org${worksDetails?.authors?.[0]?.author?.key}.json`, { headers: { 'User-Agent': '*'}})
                const author = await authorReq.json()
                if (!book.details?.authors?.length) {
                    book.details.authors = [{ name: null }]
                }
                book.details.authors[0].name = author?.name
            }
            if (typeof worksDetails?.description === 'string') {
                aggregated.description = worksDetails?.description
            } else if (worksDetails?.description?.value) {
                aggregated.description = worksDetails?.description?.value
            }
            aggregated.subjects = worksDetails?.subjects
        }
        if (aggregated) {
            // If we find aggregated reusults for /books/[id] and /works/[id], return aggregated results
            return res.status(200).json(aggregated);
        }
        // else return just the /books/[id] results
        return res.status(200).json(searchResults[`ISBN:${isbn}`]);
    }
    return res.status(400).json({ Error: "ISBN Not Found", Data: `${isbn}` })
}

export default handler
import { NextApiHandler } from "next"
import fetch from 'isomorphic-unfetch'

const handler: NextApiHandler = async (req, res) => {
    const { isbn } = req.query
    const results = await fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`);
    const searchResults = await results.json();
    if (searchResults[`ISBN:${isbn}`]) {
        return res.status(200).json(searchResults[`ISBN:${isbn}`]);
    }
    return res.status(400).json({ Message: "Not Found" })
}

export default handler
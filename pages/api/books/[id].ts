import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = algoliaClient.initIndex("dev_Bookstr");

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query
  try {
    if (!id) {
      return res.status(400).json({ message: '`id` required' })
    }
    if (typeof parseInt(id.toString()) !== 'number') {
      return res.status(400).json({ message: '`id` must be a number' })
    }

    // GET Book by ID
    if (req.method === 'GET') {
      const results = await query(
        `
        SELECT
          Users.FullName AS OwnerFullName, 
          CASE WHEN Users.Verified=1 THEN 'true' ELSE 'false' END AS OwnerVerified,
          Books.interopID, 
          Books.ISBN,
          Books.Title, 
          Books.Author, 
          Books.Description, 
          Books.Genres, 
          Books.DetailsURL,
          Books.ImageURL,
          Books.created_at,
          Books.OwnerID 
        FROM 
          Users
        INNER JOIN 
          Books
        ON 
          Users.ID = Books.OwnerID
        WHERE
          Books.interopID = ?
      `,
        id
      )
  
      return res.status(200).json(results[0])
    }

    //DELETE Book by ID
    if (req.method === 'DELETE') {
      const results = await query(
        `
        DELETE FROM Books
        WHERE interopID = ?
    `,
        id
      )
      // Remove index from algolia
      await index.deleteObject(id)
      return res.status(204).json(null)
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

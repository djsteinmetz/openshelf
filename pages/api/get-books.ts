import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (_, res) => {
  if (_?.query?.search && _?.query?.search !== '') {
    const search = _?.query?.search
    try {
      const results = await query(`
      SELECT
        Users.FullName, 
        Users.Email, 
        Books.interopID, 
        Books.Title, 
        Books.Author, 
        Books.Description, 
        Books.Genre, 
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
        Books.Title 
      LIKE
        '%${search}%'
      OR
        Books.Author
      LIKE
        '%${search}%'
    `)
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  } else {
    try {
      const results = await query(`
      SELECT
        Users.FullName, 
        Users.Email, 
        Books.interopID, 
        Books.Title, 
        Books.Author, 
        Books.Description, 
        Books.Genre, 
        Books.ImageURL,
        Books.created_at,
        Books.OwnerID 
      FROM 
        Users
      INNER JOIN 
        Books
      ON 
        Users.ID = Books.OwnerID
    `)
  
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

export default handler

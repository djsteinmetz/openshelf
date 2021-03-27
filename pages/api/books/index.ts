import { booleanConversion } from 'helpers/boolean.helpers'
import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (_, res) => {
  if (_?.query?.search && _?.query?.search !== '') {
    const search = _?.query?.search
    try {
      const results = await query(`
      SELECT
        Users.FullName AS OwnerFullName, 
        Users.Email AS OwnerEmail, 
        CASE WHEN Users.Verified=1 THEN 'true' ELSE 'false' END AS OwnerVerified,
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
      if (results) {
        (results as any).forEach(r => {
            r.OwnerVerified = booleanConversion(r.OwnerVerified)
        })
      }

      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  } else {
    try {
      const results = await query(`
      SELECT
        Users.FullName AS OwnerFullName, 
        Users.Email AS OwnerEmail, 
        CASE WHEN Users.Verified=1 THEN 'true' ELSE 'false' END AS OwnerVerified,
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
      ORDER BY 
        Books.Title 
      ASC
    `)
      if (results) {
        (results as any).forEach(r => {
            r.OwnerVerified = booleanConversion(r.OwnerVerified)
        })
      }
      return res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

export default handler

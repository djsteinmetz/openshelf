import { booleanConversion } from 'helpers/boolean.helpers'
import { IDecodedToken } from 'models/decoded-token.interface';
import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
import { verify } from 'jsonwebtoken'
import { IBook } from 'models/books.interface';
import { parse } from 'cookie';
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = algoliaClient.initIndex("dev_Bookstr");

const handler: NextApiHandler = async (_, res) => {
  // GET
  if (!_?.query?.search) {
    try {
      const results = await query(`
      SELECT
        Users.FullName AS OwnerFullName, 
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

  // GET (WITH SEARCH)
  if (_?.query?.search && _?.query?.search !== '') {
    const search = _?.query?.search
    // Serach by Algolia
    index
      .search(search)
      .then(({ hits }) => {
        console.log(hits);
        if (hits.length) {
          return res.status(200).json(hits)
        }
        return res.status(400).json(hits)
      })
      .catch(err => {
        console.log(err);
        return res.status(500)
      });

  } 

  // POST
  if (_.method === 'POST') {
    const token = parse(_.headers.cookie)['bookstr.access_token']
    try {
      const decodedToken: IDecodedToken = verify(token, process.env.API_SECRET);
      const result = await query(
        `INSERT INTO books(Title, Author, Description, Genre, OwnerID) values (?, ?, ?, ?, ?)`, [
          _.body.title,
          _.body.author,
          _.body.description,
          _.body.genre,
          decodedToken.usr
        ]
      )
      const book = await query(
        `SELECT
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
        Books.interopID = ?`, [
          (result as any)?.insertId
        ]
      )
      const newBook: IBook = book[0]
      // Index with Algolia
      const objectToIndex = {
        ...newBook,
        objectID: newBook.interopID
      }
      await index.saveObject(objectToIndex)
      return res.status(201).json(newBook);
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  // PATCH
}

export default handler
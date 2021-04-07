import { booleanConversion } from 'helpers/boolean.helpers';
import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(400).json({ message: '`id` required' })
    }

    // PATCH
    if (req.method === 'PATCH') {
      const { FullName, InstagramUsername, FacebookUsername, TwitterUsername, TikTokUsername } = req.body;
      let updateString = ''
      Object.keys(req.body).forEach((k, i) => {
        updateString = `${updateString}${i !== 0 ? ',' : ''} ${k} = ${req.body[k] === null ? `null` : `'${req.body[k]}'`}`
      })

      await query(
        `
        UPDATE 
          Users
        SET 
          ${updateString}
        WHERE 
          ID = ?
      `,
        id
      )
    }
    // GET
    const results = await query(
      `
      SELECT ID, Username, Favorites, Active, FullName, Email, Verified, InstagramUsername, TwitterUsername, FacebookUsername, TikTokUsername
      FROM users
      WHERE ID = ?
    `,
      id
    )

    // Not Found Exception
    if (res.statusCode === 200 && !results[0]) {
      return res.status(404).json({ "Object Not Found": `${id}` })
    }
    
    if (results) {
      (results as any).forEach(r => {
        r.Active = booleanConversion(r.Active)
        r.Verified = booleanConversion(r.Verified)
      })
    }

    return res.json(results[0])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

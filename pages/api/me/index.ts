import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
import { parse } from "cookie";
import { verify } from 'jsonwebtoken'
import { booleanConversion } from 'helpers/boolean.helpers';

const handler: NextApiHandler = async (req, res) => {
  // Get token from cookies
  const cookie = parse(req.headers.cookie)['openshelf.access_token']
  try {
    if (!cookie) {
      return res.status(401).json({})
    }
    const decoded = verify(cookie, process.env.NEXT_PUBLIC_API_SECRET);
    const results = await query(
      `
      SELECT ID, Username, Favorites, Active, FullName, Email, Verified, InstagramUsername, TwitterUsername, FacebookUsername, TikTokUsername
      FROM users
       WHERE Username = ?
    `,
      decoded.usr
    )

    if (results) {
      (results as any).forEach(r => {
        r.Active = booleanConversion(r.Active)
        r.Verified = booleanConversion(r.Verified)
      })
    }

    // Not Found Exception
    if (res.statusCode === 200 && !results[0]) {
      return res.status(404).json({ "Object Not Found": `${decoded.usr}` })
    }

    return res.json(results[0])
  } catch (e) {
    res.status(401).json({})
  }
}

export default handler

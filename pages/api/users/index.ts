import { booleanConversion } from 'helpers/boolean.helpers'
import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  try {
    const results = await query(
      `
      SELECT 
        ID,
        Active,
        FullName,
        Email,
        InstagramURL,
        FacebookURL,
        TwitterURL,
        TikTokURL,
        CASE WHEN Verified=1 THEN 'true' ELSE 'false' END as Verified
      FROM 
        Users
    `
    )
    if (results) {
        (results as any).forEach(r => {
            r.Active = booleanConversion(r.Active)
            r.Verified = booleanConversion(r.Verified)
        })
    }
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
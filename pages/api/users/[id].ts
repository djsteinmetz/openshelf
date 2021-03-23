import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(400).json({ message: '`id` required' })
    }
    const results = await query(
      `
      SELECT ID, Active, FullName, Email, Password, Verified
      FROM users
      WHERE ID = ?
    `,
      id
    )

    return res.json(results[0])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

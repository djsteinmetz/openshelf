import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'
import { hash } from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ID, FullName, Email, Password } = req.body
  try {
    hash(Password, 12, async function(err: unknown, hash: string) {
        if (!ID || !FullName || !Email || !Password) {
          return res
            .status(400)
            .json({ message: '`ID`, `FullName`, `Email` and `Password` are all required' })
        }
    
        const results = await query(
          `
          INSERT INTO Users (ID, Active, FullName, Email, Password, Verified)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
          [ID, true, FullName, Email, hash, false]
        )
    
        return res.json(results)
    });
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
};
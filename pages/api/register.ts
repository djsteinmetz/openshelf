import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'
var bcrypt = require('bcryptjs');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ID, FullName, Email, Password } = req.body
  
  try {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(Password, salt, async function(err, hash) {
        if (!ID || !FullName || !Email || !Password) {
          return res
            .status(400)
            .json({ message: '`ID`, `FullName`, `Email` and `Password` are all required' })
        }
    
        const results = await query(
          `
          INSERT INTO Users (ID, Active, FullName, Email, Password, Verified, Roles)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          `,
          [ID, true, FullName, Email, hash, false, `READER`]
        )
    
        return res.json(results)
      });
    });
  
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
};
import { IUser } from 'models/users.interface';
import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
import { verify } from 'jsonwebtoken'

const handler: NextApiHandler = async (req, res) => {
  const { title, author, description, genre } = req.body
  try {
    const token = verify(req.headers.cookie.split('=')[1], process.env.NEXT_PUBLIC_API_SECRET);
    const result = await query(
      `
            SELECT ID, Active, FullName, Email, Password, Verified, Roles
            FROM Users
            WHERE Email = ?
          `,
      token.email
    );
    const user = result[0] as IUser;
    if (!title || !author || !description || !genre) {
      return res
        .status(400)
        .json({ message: '`title`, `author`, `description` and `genre` are all required' })
    }

    const results = await query(
      `
      INSERT INTO Books (Title, Author, Description, Genre, OwnerID)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, author, description, genre, user.ID]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

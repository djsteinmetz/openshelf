import { parse } from "cookie";
import { NextApiHandler } from "next";
import { query } from "../../../../lib/db";
var { verify } = require("jsonwebtoken");

const handler: NextApiHandler = async (_, res) => {
    const cookie = parse(_.headers.cookie)['liblst.access_token']
    if (!cookie) {
        return res.status(401).json({ 'Error': 'Unauthorized' })
    }
    try {
        const decoded = verify(cookie, process.env.NEXT_PUBLIC_API_SECRET);
        if (_.method === 'POST') {
            try {
                await query(`
                INSERT INTO Favorites (BookID, UserID) VALUES (?, ?)
            `, [_.query.bookID, decoded.id]);
                res.status(204).end()
            } catch (e) {
                return res.status(500).json({ message: e.message });
            }

        }
        if (_.method === 'DELETE') {
            await query(`
                DELETE FROM
                    Favorites
                WHERE 
                    BookID = ?
                AND
                    UserID = ?`,
                [_.query.bookID, decoded.id])
            res.status(204).end()
        }
    } catch (err) {
        return res.status(401).json({ Message: 'Unauthorized' })
    }
};

export default handler;

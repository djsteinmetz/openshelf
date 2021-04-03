import { parse } from "cookie";
import { booleanConversion } from "helpers/boolean.helpers";
import { NextApiHandler } from "next";
import { query } from "../../../../lib/db";
var { verify } = require("jsonwebtoken");

const handler: NextApiHandler = async (_, res) => {
    const cookie = parse(_.headers.cookie)['bookstr.access_token']
    try {
        const decoded = verify(cookie, process.env.NEXT_PUBLIC_API_SECRET);
        if (_.method === 'GET') {
            try {
                const results = await query(`
                SELECT
                Users.FullName AS OwnerFullName, 
                CASE WHEN Users.Verified=1 THEN 'true' ELSE 'false' END AS OwnerVerified,
                Books.ID, 
                Books.ISBN,
                Books.Title, 
                Books.Author, 
                Books.Description, 
                Books.Genres, 
                Books.DetailsURL,
                Books.ImageURL,
                Books.created_at,
                Books.OwnerID 
              FROM 
                Favorites
              INNER JOIN 
                Books
              ON 
                Favorites.BookID = Books.ID
              INNER JOIN
                Users
              ON
                Books.OwnerID = Users.ID
              WHERE
                Favorites.UserID = ?
              ORDER BY 
                Books.Title 
              ASC
            `, [decoded.id]);
                if (results) {
                    (results as any).forEach((r) => {
                        r.OwnerVerified = booleanConversion(r.OwnerVerified);
                    });
                }
                return res.status(200).json(results);
            } catch (e) {
                res.status(500).json({ message: e.message });
            }

        }
        if (_.method === 'POST') {
            const favs = _.body.favorites.join()
            const results = await query(`
                UPDATE 
                    Users
                SET 
                    Favorites = ?
                WHERE 
                    ID = ?`,
            [favs, decoded.id])

            return res.status(200).json({ favorites: _.body.favorites })
        }
    } catch (err) {
        return res.status(500).json({ err })
    }
};

export default handler;

import { query } from "@/lib/db";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../models/users.interface";
var { sign, verify } = require('jsonwebtoken');

export default async function getAccessToken(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        const result = await query(
            `
            SELECT ID, Active, FullName, Email, Password, Verified
            FROM Users
            WHERE EMail = ?
          `,
            req.body.Email
          )
          const user = result[0] as IUser;
        compare(req.body.Password, user?.Password, function(err: Error, result: boolean) {
            // result == true
            if (user && !user?.Active) {
                return res.status(401).json({
                    "error": "invalid_grant",
                    "error_description": "User is not active.",
                    "Errors": [
                        {
                            "ErrorCode": "Auth.UserNotActive",
                            "Message": "User is not active.",
                            "Data": {}
                        }
                    ]
                })
            }
            console.log(result)
            if (!err && result && user?.Active) {
                const claims = { usr: user.ID, email: user.Email, roles: ['BooksReader'] };
                const jwt = sign(claims, process.env.API_SECRET, { expiresIn: '1h' });
                const decoded = verify(jwt, process.env.API_SECRET);
                return res.status(200).json({ 'access_token': jwt, 'expiresIn': decoded?.exp, 'token_type': 'bearer' })
            } else {
                return res.status(401).json({ 'status': res.status, 'message': 'Unauthorized' })
            }
        });
    } else {
        res.redirect('/');
    }
}
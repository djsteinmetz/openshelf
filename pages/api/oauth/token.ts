import { query } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../models/users.interface";
var { sign, verify } = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

export default async function getAccessToken(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const result = await query(
      `
            SELECT ID, Active, FullName, Email, Password, Verified, Roles
            FROM Users
            WHERE Email = ?
          `,
      req.body.Email
    );
    const user = result[0] as IUser;
    bcrypt.compare(req.body.Password, user?.Password, function (err, result) {
      if (user && !user?.Active) {
        return res.status(401).json({
          error: "invalid_grant",
          error_description: "User is not active.",
          Errors: [
            {
              ErrorCode: "Auth.UserNotActive",
              Message: "User is not active.",
              Data: {},
            },
          ],
        });
      }
      if (!err && result && user?.Active) {
        const claims = {
          usr: user.ID,
          email: user.Email,
          roles: user?.Roles?.split(' ') || user?.Roles,
        };
        const jwt = sign(claims, process.env.NEXT_PUBLIC_API_SECRET, { expiresIn: "1h" });
        const decoded = verify(jwt, process.env.NEXT_PUBLIC_API_SECRET);
        return res
          .status(200)
          .json({
            access_token: jwt,
            expiresIn: decoded?.exp,
            token_type: "bearer",
            roles: user?.Roles?.split(' ')
          });
      } else {
        return res
          .status(401)
          .json({ status: res.status, message: "Unauthorized" });
      }
    });
  } else {
    res.redirect("/");
  }
}

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
const { verify } = require('jsonwebtoken');
import cookie from 'cookie';
import { AuthError } from "models/errors.interface";
import { IDecodedToken } from "models/decoded-token.interface";

export const isAuthenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    let token = req?.cookies?.['bookster.access_token'];
    if (req?.headers?.authorization) {
        token = req?.headers?.authorization?.split(' ')?.[1];
    }
    try {
        verify(token, process.env.API_SECRET, async function(err: Error, decoded: unknown) {
            if (!err && decoded) {
                return await fn(req, res);
            }
    
            res.writeHead(401, { Location: `/access-denied`});
            res.end();
        });
      } catch(err) {
        res.writeHead(500);
        res.end();
      }
}

export const generateRolesError = (token?: string): AuthError => {
    const decoded: IDecodedToken = verify(token, process.env.API_SECRET);
    return {
        "error": "invalid_grant",
        "error_description": "User does not have the required roles to perform this action.",
        "Errors": [
            {
                "ErrorCode": "Auth.InsufficientRole",
                "Message": "User is missing the required roles.",
                "Data": {
                    "TokenRoles": decoded?.roles,
                    "RequiredRoles": ['Admin'],
                }
            }
        ]
    }
}

export const isLoggedIn = (token: string): boolean => {
    let isAuthenticated = false;
    console.log('following through', token, process.env.API_SECRET)
    verify(token, process.env.API_SECRET, async function(err: Error, decoded: unknown) {
        console.log(err)
        console.log(decoded)
        if (!err && decoded) {
            isAuthenticated = true;
        }
    });
    return isAuthenticated;
}
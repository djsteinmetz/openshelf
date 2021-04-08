import {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";
const { verify } = require("jsonwebtoken");
import { AuthError } from "models/errors.interface";
import { IDecodedToken } from "models/decoded-token.interface";
import { IUser } from "models/users.interface";

export const isAuthenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let token = req?.cookies?.["liblst.access_token"];
  if (req?.headers?.authorization) {
    token = req?.headers?.authorization?.split(" ")?.[1];
  }
  try {
    verify(
      token,
      process.env.NEXT_PUBLIC_API_SECRET,
      async function (err: Error, decoded: unknown) {
        if (!err && decoded) {
          return await fn(req, res);
        }

        res.writeHead(401, { Location: `/access-denied` });
        res.end();
      }
    );
  } catch (err) {
    res.writeHead(500);
    res.end();
  }
};

export const generateRolesError = (token?: string): AuthError => {
  const decoded: IDecodedToken = verify(
    token,
    process.env.NEXT_PUBLIC_API_SECRET
  );
  return {
    error: "invalid_grant",
    error_description:
      "User does not have the required roles to perform this action.",
    Errors: [
      {
        ErrorCode: "Auth.InsufficientRole",
        Message: "User is missing the required roles.",
        Data: {
          TokenRoles: decoded?.roles,
          RequiredRoles: ["Admin"],
        },
      },
    ],
  };
};

export const isLoggedIn = (token: string): boolean => {
  let isAuthenticated = false;
  verify(
    token,
    process.env.NEXT_PUBLIC_API_SECRET,
    async function (err: Error, decoded: unknown) {
      if (!err && decoded) {
        isAuthenticated = true;
      }
    }
  );
  return isAuthenticated;
};

export const isAdminUser = (token: string): boolean => {
  let isAdmin = false;
  verify(
    token,
    process.env.NEXT_PUBLIC_API_SECRET,
    async function (err: Error, decoded: IDecodedToken) {
      if (!err && decoded && decoded?.roles?.includes("ADMIN")) {
        isAdmin = true;
      }
    }
  );
  return isAdmin;
};

export const getProfileGreeting = (): string => {
  let greeting = `Good`
  const time = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true });
  const afternoonOrEvening = Number(time.split(' ')[0]) >= 4 ? `Evening` : `Afternoon`
  return time.includes('AM') ? `${greeting} Morning` : `${greeting} ${afternoonOrEvening}`
}

export const getInitials = (FullName: string): string => {
  return FullName?.split(" ")
    .map((s) => s.charAt(0))
    ?.join("");
}
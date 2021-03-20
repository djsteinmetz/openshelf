import Link from "next/link";
import ButtonLink from "@/components/button-link";
import Cookies from "js-cookie";
import Router from "next/router";
import React, { useEffect } from "react";
import cookie from "cookie";
import { isAdminUser, isLoggedIn } from "helpers/auth.helpers";
import ContainerFluid from "../container-fluid";

export default function Nav() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    console.log("cookies from navigation index", cookies);
    const token = cookies["booklical.access_token"];
    console.log("token from nav", token);
    const authorized = isLoggedIn(token);
    const _isAdmin = isAdminUser(token);
    setLoggedIn(authorized);
    setIsAdmin(_isAdmin);
  });

  return (
    <ContainerFluid className="bg-gray-200">
      <nav className="px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-3xl">Booklical {isAdmin ? 'Admin' : ''}</a>
          </Link>
          {!loggedIn && (
            <div>
              <a
                className="bg-black text-white p-2 rounded uppercase text-sm font-bold ml-2 cursor-pointer"
                onClick={() => Router.push("/login")}
              >
                Login
              </a>
              <a
                className="bg-black text-white p-2 rounded uppercase text-sm font-bold ml-2 cursor-pointer"
                onClick={() => Router.push("/register")}
              >
                Register
              </a>
            </div>
          )}
          {loggedIn && (
            <div>
              <ButtonLink href="/new">Add Book</ButtonLink>
              <a
                className="text-gray-600 p-2 rounded uppercase text-sm font-bold ml-2 cursor-pointer"
                onClick={() => {
                  Cookies.remove("booklical.access_token", {
                    path: "/",
                  });
                  Router.push("/login");
                }}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </nav>
    </ContainerFluid>
  );
}

import Link from "next/link";
import Container from "@/components/container";
import ButtonLink from "@/components/button-link";
import Cookies from "js-cookie";
import Router from "next/router";
import React, { useEffect } from "react";
import cookie from "cookie";
import { isLoggedIn } from "helpers/auth.helpers";

export default function Nav() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    console.log("cookies from navigation index", cookies);
    const token = cookies["bookster.access_token"];
    console.log("token from nav", token);
    const authorized = isLoggedIn(token);
    setLoggedIn(authorized);
  });

  return (
    <Container className="py-4">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-3xl">Bookish</a>
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
                  Cookies.remove("bookster.access_token", {
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
    </Container>
  );
}

import cookie from "cookie"
import { NextPageContext } from "next"

export function parseCookies(ctx: NextPageContext) {
  return cookie.parse(ctx?.req ? ctx?.req.headers.cookie || "" : document.cookie)
}
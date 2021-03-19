import { NextPageContext } from "next";
import Router from "next/router";

export async function getHelper(url: string, ctx: NextPageContext) {
    const cookie = ctx?.req?.headers?.cookie;
    const response = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    });

    if (response.status === 401 && !ctx?.req) {
        Router.replace('/login');
        return {};
    }

    if (response.status === 401 && ctx?.req) {
        ctx?.res?.writeHead(302, {
            Location: `${document.URL}login`
        });
        ctx?.res?.end();
        return;
    }

    return await response.json();
}
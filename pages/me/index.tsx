const { verify } = require('jsonwebtoken');
import Container from "@/components/container";
import { Typography } from "@material-ui/core";
import React from "react";

export default function Me() {
    
    return (
        <Container className="mt-6">
            <Typography variant="h5" className="text-center">You are logged in!</Typography>
        </Container>
    )
}

export function getServerSideProps(ctx) {
    let token = ctx?.req?.cookies?.['bookstr.access_token'];
    try {
        verify(token, process.env.NEXT_PUBLIC_API_SECRET, async function(err: Error, decoded: unknown) {
            if (err || !decoded) {
                ctx.res.statusCode = 302
                ctx.res.setHeader('Location', `/login`) // Replace <link> with your url link
            }
        });
      } catch(err) {
        return ctx?.res.setHeader('Location', '/login');
      }
    return {
      props: {}, // will be passed to the page component as props
    }
  }
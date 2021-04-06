import Container from "@/components/container";
import { UserContext } from "@/lib/user-context";
import { Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Router from 'next/router'
import Skeleton from "react-loading-skeleton";
import { getProfileGreeting } from "helpers/auth.helpers";
import Gravatar from 'react-gravatar'

export default function Me() {
    const { user, loadingUser } = useContext(UserContext)
    useEffect(() => {
        if (!user && !loadingUser) {
            Router.push('/login')
        }
    })

    if (loadingUser || !user) {
        return (
            <Container className="mt-6">
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Skeleton width={250} height={250} style={{display: 'block'}}/>
                    <Skeleton width={180} height={24} />
                    <Skeleton height={48} />
                    <div className="my-4" />
                    <Skeleton width={180} height={24} />
                    <Skeleton height={48} />
                    <div className="my-4" />
                    <Skeleton width={180} height={24} />
                    <Skeleton height={48} />
                </div>
            </Container>
        )
    }
    return (
        <Container className="mt-6">
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem'}} >
                {user.Email && <Gravatar size={250} default="identicon" email={user?.Email} />}
            </div>
            <Typography variant="h5" className="text-center">{getProfileGreeting()}, {user?.FullName?.split(' ')?.[0]}</Typography>
            <Typography variant="h6" className="text-center">{user?.Username}</Typography>
            <Typography variant="body1" className="text-center">{user?.Email}</Typography>
        </Container>
    )
}
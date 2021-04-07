import { NextPageContext } from "next";

export interface IUser {
    ID: string;
    Active: boolean;
    Username: string;
    Verified: boolean;
    FullName: string;
    Email: string;
    Password?: string;
    InstagramUsername: string;
    FacebookUsername: string;
    TwitterUsername: string;
    TikTokUsername: string;
    Roles: string;
}

export interface IUserListProps {
    usersList: IUser[]
}

export interface IUserDetailsProps {
    userDetails?: IUser
}

export interface IUserDetailsPageContext extends NextPageContext {
    query: {
      userID: string
    }
}
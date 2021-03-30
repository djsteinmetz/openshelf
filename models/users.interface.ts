import { NextPageContext } from "next";

export interface IUser {
    ID: string;
    Active: boolean;
    Verified: boolean;
    FullName: string;
    Email: string;
    Password?: string;
    InstagramURL: string;
    FacebookURL: string;
    TwitterURL: string;
    TikTokURL: string;
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
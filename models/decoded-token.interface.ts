export interface IDecodedToken {
    usr: string;
    email: string;
    roles: string[];
    iat: number;
    exp: number;
}
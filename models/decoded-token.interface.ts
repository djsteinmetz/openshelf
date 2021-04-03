export interface IDecodedToken {
    usr: string;
    id: string;
    email: string;
    roles: string[];
    iat: number;
    exp: number;
}
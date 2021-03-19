export interface AuthError {
    error: string;
    error_description: string;
    Errors: Error[]
}

interface Error {
    ErrorCode: string;
    Message: string;
    Data: ErrorData;
}

interface ErrorData {
    TokenRoles: string[];
    RequiredRoles: string[]
}
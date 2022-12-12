export enum APIErrorCode {
    DEFAULT = 400,
    NOT_ADMIN = 403,
    INCORRECT_BODY = 400
}

export interface APIError {
    errorCode: APIErrorCode
    message: string
}

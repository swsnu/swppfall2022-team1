enum APIErrorCode {
    DEFAULT = 400,
    NOT_ADMIN = 403,
    NOT_FOUND = 404,
}

enum APIErrorMessage {
    DEFAULT = '오류가 발생했습니다.',
    NOT_ADMIN = '관리자 권한이 필요합니다.',
    NOT_FOUND = '해당 리소스를 찾지 못했습니다.',
}

export interface APIErrorType {
    errorCode: APIErrorCode
    message: string
}

export const APIError = (() => {
    const DefaultError: APIErrorType = {
        errorCode: APIErrorCode.DEFAULT,
        message: APIErrorMessage.DEFAULT,
    }

    const NotAdminError: APIErrorType = {
        errorCode: APIErrorCode.NOT_ADMIN,
        message: APIErrorMessage.NOT_ADMIN,
    }

    const NotFoundError: APIErrorType = {
        errorCode: APIErrorCode.NOT_FOUND,
        message: APIErrorMessage.NOT_FOUND,
    }

    const getErrorType = (code?: number): APIErrorType => {
        switch (code) {
            case APIErrorCode.NOT_ADMIN:
                return NotAdminError
            case APIErrorCode.NOT_FOUND:
                return NotFoundError
            case APIErrorCode.DEFAULT:
            default:
                return DefaultError
        }
    }

    return Object.freeze({
        getErrorType,
    })
})()


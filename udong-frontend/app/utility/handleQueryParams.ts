import { PostType } from '../domain/model/PostType'

export const getPostTypeQueryParam = (type: PostType): string => {
    switch (type) {
        case PostType.ENROLLMENT:
            return 'enrollment'
        case PostType.SCHEDULING:
            return 'scheduling'
        case PostType.ANNOUNCEMENT:
        default:
            return 'announcement'
    }
}

export const convertQueryParamToString = (queryParam: string | Array<string> | undefined) => {
    if (queryParam instanceof Array) {
        return queryParam.join('')
    }
    return queryParam ?? ''
}

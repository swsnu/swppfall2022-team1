import { PostType } from '../../domain/model/PostType'
import { PostTypeDto } from '../dto/PostTypeDto'

const fromDto = (dto: PostTypeDto): PostType => {
    switch (dto) {
        case PostTypeDto.ANNOUNCEMENT:
            return PostType.ANNOUNCEMENT
        case PostTypeDto.ENROLLMENT:
            return PostType.ENROLLMENT
        case PostTypeDto.SCHEDULING:
            return PostType.SCHEDULING
        default:
            return PostType.ANNOUNCEMENT
    }
}

const toDto = (postType: PostType): PostTypeDto => {
    switch (postType) {
        case PostType.ENROLLMENT:
            return PostTypeDto.ENROLLMENT
        case PostType.SCHEDULING:
            return PostTypeDto.SCHEDULING
        case PostType.ANNOUNCEMENT:
        default:
            return PostTypeDto.ANNOUNCEMENT
    }
}

export const postTypeTransformer = {
    fromDto,
    toDto,
}

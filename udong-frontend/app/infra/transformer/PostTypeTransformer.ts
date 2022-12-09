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

export const postTypeTransformer = {
    fromDto,
}

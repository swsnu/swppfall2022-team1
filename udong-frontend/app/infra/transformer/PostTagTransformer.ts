import { PostTag } from '../../domain/model/Tag'
import { PostTagDto } from '../dto/PostTagDto'

const fromDto = (dto: PostTagDto): PostTag => {
    return dto
}

export const postTagTransformer = {
    fromDto,
}

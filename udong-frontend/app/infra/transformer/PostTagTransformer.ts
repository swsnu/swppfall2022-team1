import { PostTag } from '../../domain/model/Tag'
import { PostTagDto } from '../dto/PostTagDto'

const fromDto = (dto: PostTagDto): PostTag => {
    return {
        id: dto.id,
        name: dto.name,
        isDefault: dto.is_default,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const postTagTransformer = {
    fromDto,
}

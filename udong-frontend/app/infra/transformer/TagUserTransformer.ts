import { Tag } from '../../domain/model/Tag'
import { TagUserDto } from '../dto/TagUserDto'
import { userTransformer } from './UserTransformer'

const fromDto = (dto: TagUserDto): Tag => {
    return {
        ...dto,
        isDefault: dto.is_default,
        users: dto.users.map(userTransformer.fromDto),
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const tagUserTransformer = {
    fromDto,
}

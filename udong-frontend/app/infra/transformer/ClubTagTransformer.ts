import { ClubTag } from '../../domain/model/Tag'
import { ClubTagDto } from '../dto/ClubTagDto'

const fromDto = (dto: ClubTagDto): ClubTag => {
    return {
        ...dto,
        isDefault: dto.is_default,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const clubTagTransformer = {
    fromDto,
}

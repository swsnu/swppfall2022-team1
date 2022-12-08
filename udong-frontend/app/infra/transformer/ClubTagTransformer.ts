import { ClubTag } from '../../domain/model/Tag'
import { ClubTagDto } from '../dto/ClubTagDto'

const fromDto = (dto: ClubTagDto): ClubTag => {
    return {
        ...dto,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const clubTagTransformer = {
    fromDto,
}

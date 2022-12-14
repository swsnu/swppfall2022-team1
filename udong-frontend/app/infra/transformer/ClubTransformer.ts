import { Club } from '../../domain/model/Club'
import { ClubDto, ClubEditDto } from '../dto/ClubDto'

const fromDto = (dto: ClubDto): Club => {
    return {
        id: dto.id,
        name: dto.name,
        image: dto.image,
        code: dto.code,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

const toDto = (club: Club): ClubDto => {
    return {
        ...club,
        created_at: club.createdAt,
        updated_at: club.updatedAt,
    }
}

const toEditDto = (club: Club): ClubEditDto => {
    return {
        name: club.name,
        image: club.image,
    }
}

export const clubTransformer = {
    fromDto,
    toDto,
    toEditDto,
}

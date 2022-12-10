import { Club } from '../../domain/model/Club'
import { ClubDto, ClubEditDto } from '../dto/ClubDto'

const fromDto = (dto: ClubDto): Club => {
    return {
        id: dto.id,
        name: dto.name,
        image: dto.image,
        code: dto.code,
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
    toEditDto,
}

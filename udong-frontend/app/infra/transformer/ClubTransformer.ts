import { Club } from '../../domain/model/Club'
import { ClubDto } from '../dto/ClubDto'

const fromDto = (dto: ClubDto): Club => {
    return {
        id: dto.id,
        name: dto.name,
        code: dto.code,
    }
}

export const clubTransformer = {
    fromDto,
}

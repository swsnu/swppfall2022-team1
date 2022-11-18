import { ClubTag } from '../../domain/model/Tag'
import { ClubTagDto } from '../dto/ClubTagDto'

const fromDto = (dto: ClubTagDto): ClubTag => (dto)

export const clubTagTransformer = {
    fromDto,
}

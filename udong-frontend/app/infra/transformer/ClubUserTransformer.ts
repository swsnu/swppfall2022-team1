import { ClubUser } from '../../domain/model/ClubUser'
import { ClubUserDto } from '../dto/ClubUserDto'
import { userTransformer } from './UserTransformer'

export const fromDto = (dto: ClubUserDto): ClubUser => {
    return {
        user: userTransformer.fromDto(dto.user),
        role: dto.auth,
    }
}

export const clubUserTransformer = {
    fromDto,
}

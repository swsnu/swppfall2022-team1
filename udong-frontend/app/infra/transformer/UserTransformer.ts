import { User } from '../../domain/model/User'
import { UserDto } from '../dto/UserDto'

const fromDto = (dto: UserDto): User => {
    return {
        id: dto.id,
        gmail: dto.google,
        imageUrl: dto.image,
        timeTable: dto.time_table,
        name: dto.name,
    }
}

export const userTransformer = {
    fromDto,
}

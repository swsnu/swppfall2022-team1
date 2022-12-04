import { User } from '../../domain/model/User'
import { UserDto } from '../dto/UserDto'

const fromDto = (dto: UserDto): User => {
    return {
        id: dto.id,
        email: dto.email,
        imageUrl: dto.image,
        timeTable: dto.time_table,
        name: dto.name,
    }
}

export const userTransformer = {
    fromDto,
}

import { User } from '../../domain/model/User'
import { UserCommentDto, UserDto, UserEditDto } from '../dto/UserDto'

const fromDto = (dto: UserDto): User => {
    return {
        id: dto.id,
        email: dto.email,
        imageUrl: dto.image,
        timeTable: dto.time_table,
        name: dto.name,
    }
}

const toEditDto = (model: User): UserEditDto => {
    return {
        ...model.email !== '' && { email: model.email },
        ...model.imageUrl !== '' && { image: model.imageUrl },
        ...model.timeTable !== '' && { time_table: model.timeTable },
        ...model.name !== '' && { name: model.name },
    }
}

const toUserCommentDto = (model: User): UserCommentDto => {
    return {
        image: model.imageUrl,
        email: model.email,
        time_table: model.timeTable,
        name: model.name,
    }
}

export const userTransformer = {
    fromDto,
    toEditDto,
    toUserCommentDto,
}

import { User } from '../../domain/model/User'
import { new2dArray } from '../../utility/functions'
import { boolToStr, strToBool } from '../../utility/timetableFormatter'
import { UserCommentDto, UserDto, UserEditDto } from '../dto/UserDto'

const fromDto = (dto: UserDto): User => {
    return {
        id: dto.id,
        email: dto.email,
        imageUrl: dto.image,
        timeTable: strToBool(dto.time_table ?? '0'.repeat(48 * 7)),
        name: dto.name,
    }
}

const toEditDto = (model: User): UserEditDto => {
    return {
        ...model.email !== '' && { email: model.email },
        ...model.imageUrl !== '' && { image: model.imageUrl },
        ...model.timeTable && { time_table: boolToStr(model.timeTable) },
        ...model.name !== '' && { name: model.name },
    }
}

const toUserCommentDto = (model: User): UserCommentDto => {
    return {
        image: model.imageUrl,
        email: model.email,
        time_table: boolToStr(model.timeTable ?? new2dArray(7, 48, false)),
        name: model.name,
    }
}

export const userTransformer = {
    fromDto,
    toEditDto,
    toUserCommentDto,
}

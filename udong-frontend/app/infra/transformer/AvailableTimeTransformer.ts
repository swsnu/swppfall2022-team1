import { AvailableTime } from '../../domain/model/AvailableTime'
import { strToBool } from '../../utility/timetableFormatter'
import { AvailableTimeDto } from '../dto/AvailableTimeDto'
import { userTransformer } from './UserTransformer'

const fromDto = (dto: AvailableTimeDto, timeDuration: number): AvailableTime => {
    return {
        id: dto.id,
        user: userTransformer.fromDto(dto.user),
        time: strToBool(dto.time, dto.time.length / timeDuration, timeDuration),
    }
}

export const availableTimeTransformer = {
    fromDto,
}

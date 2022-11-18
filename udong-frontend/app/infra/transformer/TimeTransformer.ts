import { Time } from '../../domain/model/Time'
import { TimeDto } from '../dto/TimeDto'

const fromDto = (dto: TimeDto): Time => {
    return {
        type: dto.type,
        startDate: dto.start_date,
        endDate: dto.end_date,
        repeatStart: dto.repeat_start,
        repeatEnd: dto.repeat_end,
        weekday: dto.weekday,
        startTime: dto.start_time,
        endTime: dto.end_time,
    }
}

export const timeTransformer = {
    fromDto,
}

import { DayTime, Time } from '../../domain/model/Time'
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

const toDto = (time: Time) => {
    const common = {
        type: time.type,
        start_time: time.startTime,
        end_time: time.endTime,
    }
    if('weekday' in time) {
        return {
            ...common,
            repeat_start: time.repeatStart,
            repeat_end: time.repeatEnd,
            weekday: time.weekday,
        }
    }
    else {
        const dateTime = time as DayTime
        return {
            ...common,
            start_date: dateTime.startDate,
            end_date: dateTime.endDate,
        }
    }
}

export const timeTransformer = {
    fromDto,
    toDto,
}

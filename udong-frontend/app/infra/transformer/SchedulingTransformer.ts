import { DateSchedulingPost } from '../../domain/model/DateSchedulingPost'
import { SchedulingPostType } from '../../domain/model/SchedulingPostType'
import { WeekdaySchedulingPost } from '../../domain/model/WeekdaySchedulingPost'
import { strToBool } from '../../utility/timetableFormatter'
import { SchedulingDto } from '../dto/SchedulingDto'
import { availableTimeTransformer } from './AvailableTimeTransformer'

const fromDto = (dto: SchedulingDto): DateSchedulingPost | WeekdaySchedulingPost => {
    const timeDuration = dto.end_time - dto.start_time
    const common = {
        type: dto.type,
        startTime: dto.start_time,
        endTime: dto.end_time,
        closed: dto.closed,
        confirmedTime: dto.confirmed_time ? strToBool(dto.confirmed_time, dto.confirmed_time.length / timeDuration, timeDuration) : null,
        availableTime: dto.available_times.map((x) => availableTimeTransformer.fromDto(x, timeDuration)),
    }
    if(dto.type === SchedulingPostType.DATES) {
        return {
            ...common,
            dates: dto.dates ?? [],
        }
    }
    else {
        return {
            ...common,
            weekdays: (dto.weekdays ?? '').split('').map(x => x === '1'),
            repeatStart: dto.repeat_start ?? '',
            repeatEnd: dto.repeat_end ?? '',
        }
    }
}

export const schedulingTransformer = {
    fromDto,
}

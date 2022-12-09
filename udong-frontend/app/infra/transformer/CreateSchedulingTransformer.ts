import { CreateScheduling } from '../../domain/model/CreatePost'
import { CreateSchedulingDto } from '../dto/CreateSchedulingDto'

const toDto = (scheduling: CreateScheduling): CreateSchedulingDto => {
    return {
        type: scheduling.type,
        weekdays: scheduling.weekdays,
        repeat_start: scheduling.repeatStart,
        repeat_end: scheduling.repeatEnd,
        start_time: scheduling.startTime,
        end_time: scheduling.endTime,
        dates: scheduling.dates,
    }
}

export const createSchedulingTransformer = {
    toDto,
}

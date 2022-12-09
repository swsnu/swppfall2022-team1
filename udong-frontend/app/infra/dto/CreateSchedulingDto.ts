import { SchedulingPostType } from '../../domain/model/SchedulingPostType'

export interface CreateSchedulingDto {
    type: SchedulingPostType
    weekdays?: Array<boolean>
    repeat_start?: Date
    repeat_end?: Date
    start_time: number
    end_time: number
    dates?: Array<string>
}

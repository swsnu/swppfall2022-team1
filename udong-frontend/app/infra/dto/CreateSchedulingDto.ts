import { SchedulingPostType } from '../../domain/model/SchedulingPostType'

export interface CreateSchedulingDto {
    type: SchedulingPostType
    weekdays?: string
    repeat_start?: string
    repeat_end?: string
    start_time: number
    end_time: number
    dates?: Array<string>
}

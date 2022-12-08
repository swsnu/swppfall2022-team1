import { SchedulingPostType } from '../../domain/model/SchedulingPostType'
import { AvailableTime } from './AvailableTimeDto'

export interface SchedulingDto {
    type: SchedulingPostType
    startTime: number
    endTime: number
    dates?: Array<Date>
    weekdays?: boolean[]
    repeat_start?: Date
    repeat_end?: Date
    closed: boolean
    confirmed_time?: boolean[][]
    available_times: Array<AvailableTime>
}

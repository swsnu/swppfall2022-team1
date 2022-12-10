import { SchedulingPostType } from '../../domain/model/SchedulingPostType'
import { AvailableTimeDto } from './AvailableTimeDto'

export interface SchedulingDto {
    type: SchedulingPostType
    start_time: number
    end_time: number
    dates: Array<string> | null
    weekdays: string | null
    repeat_start: string | null
    repeat_end: string | null
    closed: boolean
    confirmed_time: string | null
    available_times: Array<AvailableTimeDto>
}

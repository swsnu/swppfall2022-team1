import { SchedulingPostType } from './SchedulingPostType'

export interface SchedulingPost {
    type: SchedulingPostType
    startTime: number
    endTime: number
    dates?: Array<Date>
    weekdays?: boolean[]
    repeat_start?: Date
    repeat_end?: Date
    closed: boolean
    confirmed_time?: boolean[][]
}

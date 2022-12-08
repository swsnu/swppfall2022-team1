import { SchedulingPostType } from './SchedulingPostType'

export interface SchedulingPost {
    type: SchedulingPostType
    startTime: number
    endTime: number
    closed: boolean
    confirmed_time?: boolean[][]
}

import { SchedulingPostType } from './SchedulingPostType'

export interface Time {
    type: SchedulingPostType
    startDate: string
    endDate: string
    repeatStart?: string
    repeatEnd?: string
    weekday?: string
    startTime: number
    endTime: number
}

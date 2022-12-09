import { SchedulingPostType } from './SchedulingPostType'

export interface BaseTime {
    type: SchedulingPostType
    startTime: number
    endTime: number
}

export interface WeekdayTime extends BaseTime {
    repeatStart?: string
    repeatEnd?: string
    weekday?: string
}

export interface DayTime extends BaseTime {
    startDate: string
    endDate: string
}

export type Time = WeekdayTime | DayTime

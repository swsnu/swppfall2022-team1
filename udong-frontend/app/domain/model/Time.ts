import { SchedulingPostType } from './SchedulingPostType'

export interface BaseTime {
    startTime: number
    endTime: number
}

export interface WeekdayTime extends BaseTime {
    type: SchedulingPostType.DAYS
    repeatStart: string
    repeatEnd: string
    weekday: number
}

export interface DayTime extends BaseTime {
    type: SchedulingPostType.DATES
    startDate: string
    endDate: string
}

export type Time = WeekdayTime | DayTime

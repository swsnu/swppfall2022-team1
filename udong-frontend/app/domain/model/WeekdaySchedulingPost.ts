import { SchedulingPost } from './SchedulingPost'

export interface WeekdaySchedulingPost extends SchedulingPost {
    weekdays: string
    repeatStart: Date
    repeatEnd: Date
    closed: boolean
}

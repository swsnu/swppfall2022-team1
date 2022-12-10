import { SchedulingPost } from './SchedulingPost'

export interface WeekdaySchedulingPost extends SchedulingPost {
    weekdays: boolean[]
    repeatStart: string
    repeatEnd: string
}

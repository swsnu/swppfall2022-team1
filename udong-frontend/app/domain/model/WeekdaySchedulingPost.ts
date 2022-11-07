import { SchedulingPost } from './SchedulingPost'

export interface WeekdaySchedulingPost extends SchedulingPost {
    weekdays: string
    // TODO: dateField를 어케 표현할 것인가
    repeatStart: number
    repeatEnd: number
    closed: boolean
    createdAt: number
    updatedAt: number
}

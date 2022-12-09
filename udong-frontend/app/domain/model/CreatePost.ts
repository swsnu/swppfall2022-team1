import { PostType } from './PostType'
import { SchedulingPostType } from './SchedulingPostType'

export type CreatePost = {
    type: PostType
    eventId?: number
    tagIdList: Array<number>
    title: string
    content: string
    scheduling?: CreateScheduling
}

export interface CreateScheduling {
    type: SchedulingPostType
    weekdays?: Array<boolean>
    repeatStart?: Date
    repeatEnd?: Date
    startTime: number
    endTime: number
    dates?: Array<string>
}

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
    weekdays?: string
    repeatStart?: string
    repeatEnd?: string
    startTime: number
    endTime: number
    dates?: Array<string>
}

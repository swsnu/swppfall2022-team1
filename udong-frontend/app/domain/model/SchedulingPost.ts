import { Post } from './Post'
import { SchedulingPostType } from './SchedulingPostType'

export interface SchedulingPost {
    post: Post
    type: SchedulingPostType
    startTime: number
    endTime: number
}

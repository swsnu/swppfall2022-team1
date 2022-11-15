import { ListItemPost } from './ListItemPost'
import { SchedulingPostType } from './SchedulingPostType'

export interface SchedulingPost {
    post: ListItemPost
    type: SchedulingPostType
    startTime: number
    endTime: number
}

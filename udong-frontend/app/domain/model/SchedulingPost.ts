import { AvailableTime } from './AvailableTime'
import { SchedulingPostType } from './SchedulingPostType'

export interface SchedulingPost {
    type: SchedulingPostType
    startTime: number
    endTime: number
    closed: boolean
    confirmedTime: boolean[][] | null
    availableTime: Array<AvailableTime>
}

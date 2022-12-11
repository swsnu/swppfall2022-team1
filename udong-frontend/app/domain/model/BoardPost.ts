import { Club } from './Club'
import { EventName } from './ClubEvent'
import { DateSchedulingPost } from './DateSchedulingPost'
import { Enrollment } from './Enrollment'
import { PostType } from './PostType'
import { PostTag } from './Tag'
import { WeekdaySchedulingPost } from './WeekdaySchedulingPost'

export interface BoardPost {
    displayType: PostDisplayType
    id: number
    author?: string
    club?: Club
    eventName?: EventName
    eventId?: number
    title: string
    content: string
    type: PostType
    scheduling?: DateSchedulingPost | WeekdaySchedulingPost
    enrollment?: Enrollment
    closed?: boolean
    includedTags?: Array<PostTag>
    excludedTags?: Array<PostTag>
    createdAt?: string
    updatedAt?: string
}

export enum PostDisplayType {
    FEED = 'FEED',
    CLUB = 'CLUB',
    EVENT = 'EVENT',
}

import { EventName } from './ClubEvent'
import { PostType } from './PostType'
import { PostTag } from './Tag'

export interface ListItemPost {
    displayType: PostDisplayType
    id: number
    author?: string
    eventName?: EventName
    clubName?: string
    title: string
    content: string
    type: PostType
    closed?: boolean
    includedTags?: Array<PostTag>
    excludedTags?: Array<PostTag>
    createdAt?: string
    updatedAt?: string
}

export enum PostDisplayType {
    FEED = 'FEED',
    BOARD = 'BOARD',
    EVENT = 'EVENT',
}

// 나중에 feed post, event detail post 타입 추가
export type BoardPost = Omit<ListItemPost, 'clubName'>

import { Event } from './Event'
import { PostType } from './PostType'
import { User } from './User'

export interface Post {
    id: number
    author: User
    event: Event
    title: string
    content: string
    type: PostType
    createdAt: number
}

import { Club } from './Club'
import { Post } from './Post'

export interface Event {
    id: number
    club: Club
    name: string
    createdAt: number
    updatedAt: number
    // TODO: needs confirmation
    posts: Array<Post>
}

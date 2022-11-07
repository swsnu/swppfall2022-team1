import { Post } from './Post'
import { User } from './User'

export interface Comment {
    id: number
    user: User
    post: Post
    content: string
    createdAt: number
    updatedAt: number
}

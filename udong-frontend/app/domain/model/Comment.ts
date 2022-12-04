import { User } from './User'

export interface Comment {
    id: number
    user: User
    postId: number
    content: string
    createdAt?: string
    updatedAt?: string
}

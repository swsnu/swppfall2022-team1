import { UserDto } from './UserDto'

export interface CommentDto {
    id: number
    user: UserDto
    post_id: number
    content: string
    created_at?: string
    updated_at?: string
}

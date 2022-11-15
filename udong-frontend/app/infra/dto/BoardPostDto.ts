import { PostType } from '../../domain/model/PostType'
import { PostTagDto } from './PostTagDto'

export interface BoardPostDto {
    id: number
    event?: string
    title: string
    content: string
    type: PostType
    closed?: boolean
    included_tags?: Array<PostTagDto>
    excluded_tags?: Array<PostTagDto>
    created_at?: string
    updated_at?: string
}

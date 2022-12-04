import { PostType } from '../../domain/model/PostType'
import { EventNameDto } from './EventNameDto'
import { PostTagDto } from './PostTagDto'

export interface BoardPostDto {
    id: number
    author?: string
    event?: EventNameDto
    title: string
    content: string
    type: PostType
    closed?: boolean
    include_tag?: Array<PostTagDto>
    exclude_tag?: Array<PostTagDto>
    created_at?: string
    updated_at?: string
}

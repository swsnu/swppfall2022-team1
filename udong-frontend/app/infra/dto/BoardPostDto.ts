import { PostType } from '../../domain/model/PostType'
import { ClubDto } from './ClubDto'
import { EnrollmentDto } from './EnrollmentDto'
import { EventNameDto } from './EventNameDto'
import { PostTagDto } from './PostTagDto'
import { SchedulingDto } from './SchedulingDto'

export interface BoardPostDto {
    id: number
    author?: string
    club?: ClubDto
    event?: EventNameDto
    title: string
    content: string
    type: PostType
    scheduling?: SchedulingDto
    enrollment?: EnrollmentDto
    closed?: boolean
    include_tag?: Array<PostTagDto>
    exclude_tag?: Array<PostTagDto>
    created_at: string
    updated_at: string
}

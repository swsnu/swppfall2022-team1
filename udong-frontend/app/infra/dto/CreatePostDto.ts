import { CreateSchedulingDto } from './CreateSchedulingDto'
import { PostTypeDto } from './PostTypeDto'

export type CreatePostDto = {
    type: PostTypeDto
    event_id?: number
    tag_list: Array<number>
    title: string
    content: string
    scheduling?: CreateSchedulingDto
}

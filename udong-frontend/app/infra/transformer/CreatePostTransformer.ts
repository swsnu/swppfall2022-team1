import { CreatePost } from '../../domain/model/CreatePost'
import { CreatePostDto } from '../dto/CreatePostDto'
import { createSchedulingTransformer } from './CreateSchedulingTransformer'
import { postTypeTransformer } from './PostTypeTransformer'

const toDto = (createPost: CreatePost): CreatePostDto => {
    return {
        type: postTypeTransformer.toDto(createPost.type),
        event_id: createPost.eventId,
        tag_list: createPost.tagIdList,
        title: createPost.title,
        content: createPost.content,
        scheduling: createPost.scheduling ? createSchedulingTransformer.toDto(createPost.scheduling) : undefined,
    }
}

export const createPostTransformer = {
    toDto,
}

import { Comment } from '../../domain/model/Comment'
import { CommentDto } from '../dto/CommentDto'
import { userTransformer } from './UserTransformer'

const fromDto = (dto: CommentDto): Comment => {
    return {
        id: dto.id,
        user: userTransformer.fromDto(dto.user),
        postId: dto.post_id,
        content: dto.content,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const commentTransformer = {
    fromDto,
}

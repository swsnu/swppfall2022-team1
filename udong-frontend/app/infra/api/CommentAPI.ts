import { Comment } from '../../domain/model/Comment'
import { User } from '../../domain/model/User'
import { CommentDto } from '../dto/CommentDto'
import { axiosConfig } from '../global'
import { commentTransformer } from '../transformer/CommentTransformer'
import { userTransformer } from '../transformer/UserTransformer'

export const CommentAPI = (() => {
    async function editComment(commentId: number, user: User, content: string): Promise<Comment> {
        const response = await axiosConfig.put<CommentDto>(
            `/api/comment/${commentId}/`,
            {
                user: userTransformer.toUserCommentDto(user),
                content,
            },
        )
        return commentTransformer.fromDto(response.data)
    }

    async function deleteComment(commentId: number): Promise<void> {
        return await axiosConfig.delete(`/api/comment/${commentId}/`)
    }

    return Object.freeze({
        editComment,
        deleteComment,
    })
})()

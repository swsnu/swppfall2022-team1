import { BoardPost, PostDisplayType } from '../../domain/model/BoardPost'
import { Comment } from '../../domain/model/Comment'
import { User } from '../../domain/model/User'
import { BoardPostDto } from '../dto/BoardPostDto'
import { CommentDto } from '../dto/CommentDto'
import { axiosConfig } from '../global'
import { boardPostTransformer } from '../transformer/BoardPostTransformer'
import { commentTransformer } from '../transformer/CommentTransformer'
import { userTransformer } from '../transformer/UserTransformer'

export const PostAPI = (() => {
    async function getFeedPosts(): Promise<Array<BoardPost>> {
        const response = await axiosConfig.get<Array<BoardPostDto>>(`/api/post/`)
        return response.data.map(dto => boardPostTransformer.fromDto(dto, PostDisplayType.FEED))
    }

    async function getPost(postId: string): Promise<BoardPost> {
        const response = await axiosConfig.get<BoardPostDto>(`/api/post/${postId}/`)
        return boardPostTransformer.fromDto(response.data, PostDisplayType.CLUB)
    }
    function editPost() { return }
    function deletePost() { return }

    async function getComments(postId: number): Promise<Array<Comment>> {
        const response = await axiosConfig.get<Array<CommentDto>>(`/api/post/${postId}/comment/`)
        return response.data.map(commentTransformer.fromDto)
    }

    async function createComment(postId: number, user: User, content: string): Promise<Comment> {
        const response = await axiosConfig.post<CommentDto>(
            `/api/post/${postId}/comment/`,
            {
                user: userTransformer.toUserCommentDto(user),
                content,
            },
        )
        return commentTransformer.fromDto(response.data)
    }

    return Object.freeze({
        getFeedPosts,
        getPost,
        editPost,
        deletePost,
        getComments,
        createComment,
    })
})()

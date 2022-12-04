import { Comment } from '../../domain/model/Comment'
import { BoardPost } from '../../domain/model/ListItemPost'
import { BoardPostDto } from '../dto/BoardPostDto'
import { CommentDto } from '../dto/CommentDto'
import { axiosConfig } from '../global'
import { boardPostTransformer } from '../transformer/BoardPostTransformer'
import { commentTransformer } from '../transformer/CommentTransformer'

export const PostAPI = (() => {
    async function getFeedPosts(): Promise<Array<BoardPost>> {
        const response = await axiosConfig.get<Array<BoardPostDto>>(`/api/post/`)
        return response.data.map(boardPostTransformer.fromDto)
    }

    async function getClubPosts(clubId: number): Promise<Array<BoardPost>> {
        const response = await axiosConfig.get<Array<BoardPostDto>>(`/api/post/club/${clubId}/`)
        return response.data.map(boardPostTransformer.fromDto)
    }

    async function getPost(postId: string): Promise<BoardPost> {
        const response = await axiosConfig.get<BoardPostDto>(`/api/post/${postId}/`)
        return boardPostTransformer.fromDto(response.data)
    }
    function createPost() { return }
    function editPost() { return }
    function deletePost() { return }

    async function getComments(postId: number): Promise<Array<Comment>> {
        const response = await axiosConfig.get<Array<CommentDto>>(`/api/post/${postId}/comment/`)
        return response.data.map(commentTransformer.fromDto)
    }
    function createComment() { return }

    return Object.freeze({
        getFeedPosts,
        getClubPosts,
        getPost,
        createPost,
        editPost,
        deletePost,
        getComments,
        createComment,
    })
})()

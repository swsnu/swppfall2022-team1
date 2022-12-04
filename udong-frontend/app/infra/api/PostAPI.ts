import postId from '../../../pages/club/[clubId]/post/[postId]'
import { BoardPost } from '../../domain/model/ListItemPost'
import { User } from '../../domain/model/User'
import { BoardPostDto } from '../dto/BoardPostDto'
import { axiosConfig } from '../global'
import { boardPostTransformer } from '../transformer/BoardPostTransformer'

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

    function getComments() { return }
    async function createComment(user: User, content: string) {
        const response = await axiosConfig.post(`/api/post/${postId}/comment/`)
        return response.data
    }

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

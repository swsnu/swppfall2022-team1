import axios from 'axios'

import { BoardPost } from '../../domain/model/ListItemPost'
import { BoardPostDto } from '../dto/BoardPostDto'
import { boardPostTransformer } from '../transformer/BoardPostTransformer'

export const PostAPI = (() => {
    function getFeedPosts() { return }

    async function getClubPosts(clubId: number): Promise<Array<BoardPost>> {
        const response = await axios.get<Array<BoardPostDto>>(`/api/post/club/${clubId}/`)
        return response.data.map(boardPostTransformer.fromDto)
    }

    function getPost() { return }
    function createPost() { return }
    function editPost() { return }
    function deletePost() { return }

    function getComments() { return }
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

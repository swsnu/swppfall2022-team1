import { axiosConfig } from '../global'

export const CommentAPI = (() => {
    function editComment() { return }
    async function deleteComment(commentId: number): Promise<void> {
        return await axiosConfig.delete(`/api/comment/${commentId}/`)
    }

    return Object.freeze({
        editComment,
        deleteComment,
    })
})()

export const PostAPI = (() => {
    function getFeedPosts() { return }
    function getClubPosts() { return }
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

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { PostAPI } from '../../../infra/api/PostAPI'
import { Comment } from '../../model/Comment'
import { BoardPost } from '../../model/ListItemPost'

export interface PostState {
    selectedPost?: BoardPost
    boardPosts: Array<BoardPost>
    comments: Array<Comment>
}

const initialState: PostState = {
    boardPosts: [],
    comments: [],
}

export const getFeedPosts = createAsyncThunk(
    'post/getFeedPosts',
    async () => { return },
)

export const getClubPosts = createAsyncThunk(
    'post/getClubPosts',
    async (clubId: number) => {
        return PostAPI.getClubPosts(clubId)
    },
)

export const getPost = createAsyncThunk(
    'post/getPost',
    async (postId: string) => {
        return PostAPI.getPost(postId)
    },
)

export const createPost = createAsyncThunk(
    'post/createPost',
    async () => { return },
)

export const editPost = createAsyncThunk(
    'post/editPost',
    async () => { return },
)

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async () => { return },
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getClubPosts.fulfilled, (state, action) => {
            state.boardPosts = action.payload
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.selectedPost = action.payload
        })
    },
})

export const postActions = {
    ...postSlice.actions,
    getClubPosts,
    getPost,
}
export const postReducer = postSlice.reducer

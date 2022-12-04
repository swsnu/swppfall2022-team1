import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { PostAPI } from '../../../infra/api/PostAPI'
import { Comment } from '../../model/Comment'
import { BoardPost, ListItemPost } from '../../model/ListItemPost'

export interface PostState {
    selectedPost?: ListItemPost
    feedPosts: Array<BoardPost>
    clubPosts: Array<BoardPost>
    comments: Array<Comment>
}

const initialState: PostState = {
    feedPosts: [],
    clubPosts: [],
    comments: [],
}

export const getFeedPosts = createAsyncThunk(
    'post/getFeedPosts',
    async () => {
        return PostAPI.getFeedPosts()
    },
)

export const getClubPosts = createAsyncThunk(
    'post/getClubPosts',
    async (clubId: number) => {
        return PostAPI.getClubPosts(clubId)
    },
)

export const getPost = createAsyncThunk(
    'post/getPost',
    async () => { return },
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
        builder.addCase(getFeedPosts.fulfilled, (state, action) => {
            state.feedPosts = action.payload
        })
        builder.addCase(getClubPosts.fulfilled, (state, action) => {
            state.clubPosts = action.payload
        })
    },
})

export const postActions = {
    ...postSlice.actions,
    getClubPosts,
    getFeedPosts,
}
export const postReducer = postSlice.reducer

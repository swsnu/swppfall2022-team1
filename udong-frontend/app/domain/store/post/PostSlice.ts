import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Comment } from '../../model/Comment'
import { Post } from '../../model/Post'

interface PostState {
    selectedPost?: Post
    comments: Array<Comment>
}

const initialState: PostState = {
    comments: [],
}

export const getFeedPosts = createAsyncThunk(
    'post/getFeedPosts',
    async () => { return },
)

export const getClubPosts = createAsyncThunk(
    'post/getClubPosts',
    async () => { return },
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
})

export const postActions = postSlice.actions
export const postReducer = postSlice.reducer

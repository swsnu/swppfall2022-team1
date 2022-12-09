import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { PostAPI } from '../../../infra/api/PostAPI'
import { BoardPost } from '../../model/BoardPost'
import { CreatePost } from '../../model/CreatePost'

export interface PostState {
    selectedPost?: BoardPost
    feedPosts: Array<BoardPost>
    clubPosts: Array<BoardPost>
}

const initialState: PostState = {
    feedPosts: [],
    clubPosts: [],
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
        return ClubAPI.getClubPosts(clubId)
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
    async ({ clubId, post }: { clubId: number, post: CreatePost }) => {
        return ClubAPI.createClubPost(clubId, post)
    },
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
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.selectedPost = action.payload
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.selectedPost = action.payload
        })
    },
})

export const postActions = {
    ...postSlice.actions,
    getFeedPosts,
    getClubPosts,
    getPost,
    createPost,
}
export const postReducer = postSlice.reducer

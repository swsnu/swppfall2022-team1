import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { PostAPI } from '../../../infra/api/PostAPI'
import { BoardPost } from '../../model/BoardPost'
import { CreatePost } from '../../model/CreatePost'

export type PostCreateAPIErrorType = 'missing_required_field' | 'is_not_admin' | 'error'

export interface PostState {
    selectedPost?: BoardPost
    createdPostId?: number
    createPostError?: PostCreateAPIErrorType
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

export const createPost =
    createAsyncThunk<BoardPost | undefined, { clubId: number, post: CreatePost }, { rejectValue: PostCreateAPIErrorType }>(
        'post/createPost',
        async ({ clubId, post }: { clubId: number, post: CreatePost }, { rejectWithValue }) => {
            try {
                return await ClubAPI.createClubPost(clubId, post)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    if (e.response?.status === 400) {
                        return rejectWithValue('missing_required_field')
                    } else if (e.response?.status === 403) {
                        return rejectWithValue('is_not_admin')
                    } else {
                        return rejectWithValue('error')
                    }
                }
            }
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
    reducers: {
        resetCreatePostError: (state) => {
            state.createPostError = undefined
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedPosts.fulfilled, (state, action) => {
            state.feedPosts = action.payload
        })
        builder.addCase(getClubPosts.fulfilled, (state, action) => {
            state.clubPosts = action.payload
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.selectedPost = action.payload
            state.createdPostId = undefined
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.createdPostId = action.payload?.id
            state.selectedPost = action.payload
        })
        builder.addCase(createPost.rejected, (state, action) => {
            state.selectedPost = undefined
            state.createdPostId = undefined
            state.createPostError = action.payload
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

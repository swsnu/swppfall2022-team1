import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { EventAPI } from '../../../infra/api/EventAPI'
import { PostAPI } from '../../../infra/api/PostAPI'
import { BoardPost } from '../../model/BoardPost'
import { CreatePost } from '../../model/CreatePost'
import { APIError, APIErrorType } from '../ErrorHandler'

export interface PostErrorType {
    createPostError?: APIErrorType
}

export interface PostState {
    selectedPost?: BoardPost
    createdPostId?: number
    feedPosts: Array<BoardPost>
    clubPosts: Array<BoardPost>
    eventPosts: Array<BoardPost>
    errors: PostErrorType
}

const initialState: PostState = {
    feedPosts: [],
    clubPosts: [],
    eventPosts: [],
    errors: {},
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

export const getEventPosts = createAsyncThunk(
    `post/getEventPosts`,
    async (eventId : number) => {
        return EventAPI.getEventPosts(eventId)
    },
)

export const createPost =
    createAsyncThunk<BoardPost | undefined, { clubId: number, post: CreatePost }, { rejectValue: APIErrorType }>(
        'post/createPost',
        async ({ clubId, post }: { clubId: number, post: CreatePost }, { rejectWithValue }) => {
            try {
                return await ClubAPI.createClubPost(clubId, post)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    const errorType = APIError.getErrorType(e.response?.status)
                    let message: string = errorType.message

                    if (errorType.errorCode === 400) {
                        message = '모든 필드를 알맞게 입력해주세요.'
                    }

                    return rejectWithValue({
                        ...errorType,
                        message,
                    })
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
        resetErrors: (state) => {
            state.errors = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedPosts.fulfilled, (state, action) => {
            state.feedPosts = action.payload
        })
        builder.addCase(getClubPosts.fulfilled, (state, action) => {
            state.clubPosts = action.payload
        })
        builder.addCase(getEventPosts.fulfilled, (state, action) => {
            state.eventPosts = action.payload
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
            state.errors.createPostError = action.payload
        })
    },
})

export const postActions = {
    ...postSlice.actions,
    getFeedPosts,
    getClubPosts,
    getEventPosts,
    getPost,
    createPost,
}
export const postReducer = postSlice.reducer

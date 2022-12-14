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

export const getEventPosts = createAsyncThunk(
    'post/getEventPosts',
    async (eventId: number) => {
        return EventAPI.getEventPosts(eventId)
    },
)

export const getPost = createAsyncThunk(
    'post/getPost',
    async (postId: string) => {
        return PostAPI.getPost(postId)
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
                        message = '?????? ????????? ????????? ??????????????????.'
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
    async ({ postId, post, tagIdList }: { postId: number, post: BoardPost, tagIdList: Array<number> }) => {
        return PostAPI.editPost(postId, post, tagIdList)
    },
)

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId: number) => {
        return PostAPI.deletePost(postId)
    },
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
        builder.addCase(deletePost.fulfilled, (state) => {
            state.selectedPost = undefined
        })
        builder.addCase(editPost.fulfilled, (state, action) => {
            state.selectedPost = action.payload
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
    deletePost,
    editPost,
}
export const postReducer = postSlice.reducer

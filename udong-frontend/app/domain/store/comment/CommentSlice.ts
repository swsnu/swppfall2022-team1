import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { PostAPI } from '../../../infra/api/PostAPI'
import { Comment } from '../../model/Comment'
import { User } from '../../model/User'

export interface CommentState {
    selectedComment?: Comment
    postComments: Array<Comment>
}

const initialState: CommentState = {
    postComments: [],
}

export const getComments = createAsyncThunk(
    'comment/getComments',
    async (postId: number) => {
        return PostAPI.getComments(postId)
    },
)

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ postId, user, content }: { postId: number, user: User, content: string }) => {
        return PostAPI.createComment(postId, user, content)
    },
)

export const editComment = createAsyncThunk(
    'comment/editComment',
    async () => { return },
)

export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async () => { return },
)

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.postComments = action.payload
        })
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.selectedComment = action.payload
        })
    },
})

export const commentActions = {
    ...commentSlice.actions,
    getComments,
    createComment,
}
export const commentReducer = commentSlice.reducer

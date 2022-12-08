import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { CommentAPI } from '../../../infra/api/CommentAPI'
import { PostAPI } from '../../../infra/api/PostAPI'
import { Comment } from '../../model/Comment'
import { User } from '../../model/User'

type CommentAPIErrorType = 'error' | 'forbidden'

export interface CommentState {
    selectedCommentId?: number
    postComments: Array<Comment>
    error?: CommentAPIErrorType
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
    async ({ commentId, user, content }: { commentId: number, user: User, content: string }) => {
        return CommentAPI.editComment(commentId, user, content)
    },
)

export const deleteComment = createAsyncThunk<void, number, { rejectValue: CommentAPIErrorType }>(
    'comment/deleteComment',
    async (commentId: number, { rejectWithValue }) => {
        try {
            return await CommentAPI.deleteComment(commentId)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 403) {
                    return rejectWithValue('forbidden')
                }
            }
            return rejectWithValue('error')
        }
    },
)

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setSelectedCommentId: (state, action: PayloadAction<number>) => {
            state.selectedCommentId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.postComments = action.payload
        })
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.postComments = state.postComments.concat(action.payload)
        })
        builder.addCase(editComment.fulfilled, (state, action) => {
            state.postComments = state.postComments
                .map(comment => comment.id === state.selectedCommentId ? { ...comment, ...action.payload } : comment)
            state.selectedCommentId = undefined
        })
        builder.addCase(editComment.rejected, (state) => {
            state.selectedCommentId = undefined
        })
        builder.addCase(deleteComment.fulfilled, (state) => {
            state.postComments = state.postComments.filter(comment => comment.id !== state.selectedCommentId)
            state.selectedCommentId = undefined
            state.error = undefined
        })
        builder.addCase(deleteComment.rejected, (state, action) => {
            state.error = action.payload
            state.selectedCommentId = undefined
        })
    },
})

export const commentActions = {
    ...commentSlice.actions,
    getComments,
    createComment,
    editComment,
    deleteComment,
}
export const commentReducer = commentSlice.reducer

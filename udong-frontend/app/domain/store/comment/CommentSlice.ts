import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Comment } from '../../model/Comment'

export interface CommentState {
    selectedComment?: Comment
}

const initialState: CommentState = {
}

export const getComments = createAsyncThunk(
    'comment/getComments',
    async () => { return },
)

export const createComment = createAsyncThunk(
    'comment/createComment',
    async () => { return },
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
})

export const commentActions = commentSlice.actions
export const commentReducer = commentSlice.reducer

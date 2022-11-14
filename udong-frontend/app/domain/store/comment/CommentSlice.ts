import { createSlice } from '@reduxjs/toolkit'

import { Comment } from '../../model/Comment'

interface CommentState {
    selectedComment?: Comment
}

const initialState: CommentState = {
}

// TODO: actions

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
})

export const commentActions = commentSlice.actions
export const commentReducer = commentSlice.reducer

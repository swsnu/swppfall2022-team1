import { createSlice } from '@reduxjs/toolkit'

import { Comment } from '../../model/Comment'
import { Post } from '../../model/Post'

interface PostState {
    selectedPost?: Post
    comments: Array<Comment>
}

const initialState: PostState = {
    comments: [],
}

// TODO: actions

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
})

export const postActions = postSlice.actions
export const postReducer = postSlice.reducer

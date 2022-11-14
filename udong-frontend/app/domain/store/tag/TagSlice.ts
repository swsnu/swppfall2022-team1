import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Tag } from '../../model/Tag'

interface TagState {
    selectedTag?: Tag
}

const initialState: TagState = {
}

export const getTags = createAsyncThunk(
    'tag/getTags',
    async () => { return },
)

export const getTag = createAsyncThunk(
    'tag/getTag',
    async () => { return },
)

export const createTag = createAsyncThunk(
    'tag/createTag',
    async () => { return },
)

export const editTag = createAsyncThunk(
    'tag/editTag',
    async () => { return },
)

export const deleteTag = createAsyncThunk(
    'tag/deleteTag',
    async () => { return },
)

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {},
})

export const tagActiosn = tagSlice.actions
export const tagReducer = tagSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { ClubTag, Tag } from '../../model/Tag'

interface TagState {
    selectedTag?: Tag
    tags: Array<ClubTag>
}

const initialState: TagState = {
    tags: [],
}

export const getTags = createAsyncThunk(
    'tag/getTags',
    async (clubId: number) => {
        return ClubAPI.getClubTags(clubId)
    },
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
    extraReducers: (builder) => {
        builder.addCase(getTags.fulfilled, (state, action) => {
            state.tags = action.payload
        })
    },
})

export const tagActions = {
    ...tagSlice.actions,
    getTags,
}
export const tagReducer = tagSlice.reducer

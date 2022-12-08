import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { TagAPI } from '../../../infra/api/TagAPI'
import { Tag } from '../../model/Tag'

export interface TagState {
    selectedTag?: Tag
    tags: Array<Tag>
}

const initialState: TagState = {
    tags: [],
}

export const getTags = createAsyncThunk(
    'tag/getTags',
    async (clubId: number) => {
        const clubTags = await ClubAPI.getClubTags(clubId)
        const tags = await Promise.all(
            clubTags.map((tag) => {
                return TagAPI.getTag(tag.id)
            }),
        )
        return tags
    },
)

export const getTag = createAsyncThunk(
    'tag/getTag',
    async (tagId: number) => {
        return TagAPI.getTag(tagId)
    },
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
        builder.addCase(getTag.fulfilled, (state, action) => {
            state.selectedTag = action.payload
        })
    },
})

export const tagActions = {
    ...tagSlice.actions,
    getTags,
    getTag,
}
export const tagReducer = tagSlice.reducer

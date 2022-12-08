import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { TagAPI } from '../../../infra/api/TagAPI'
import { Tag } from '../../model/Tag'

type TagAPIErrorType = 'error' | 'forbidden'

export interface TagState {
    selectedTag?: Tag
    tags: Array<Tag>
    error?: TagAPIErrorType
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

export const deleteTag = createAsyncThunk<void, number, { rejectValue: TagAPIErrorType }>(
    'tag/deleteTag',
    async (tagId: number, { rejectWithValue }) => {
        try {
            const response = await TagAPI.deleteTag(tagId)
            return response
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

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        setSelectedTag: (state, action: PayloadAction<Tag>) => {
            state.selectedTag = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTags.fulfilled, (state, action) => {
            state.tags = action.payload
        })
        builder.addCase(getTag.fulfilled, (state, action) => {
            state.selectedTag = action.payload
        })
        builder.addCase(deleteTag.fulfilled, (state) => {
            state.tags = state.tags.filter(tag => tag.id !== state.selectedTag?.id)
            state.selectedTag = undefined
        })
        builder.addCase(deleteTag.rejected, (state, action) => {
            state.error = action.payload
            state.selectedTag = undefined
        })
    },
})

export const tagActions = {
    ...tagSlice.actions,
    getTags,
    getTag,
    deleteTag,
}
export const tagReducer = tagSlice.reducer

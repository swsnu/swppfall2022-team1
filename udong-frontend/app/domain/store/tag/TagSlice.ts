import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { TagAPI } from '../../../infra/api/TagAPI'
import { EditTag, Tag } from '../../model/Tag'
import { APIError, APIErrorType } from '../ErrorHandler'

export interface TagErrorType {
    deleteTagError?: APIErrorType
    editTagError?: APIErrorType
}

export interface TagState {
    selectedTag?: Tag
    tags: Array<Tag>
    errors: TagErrorType
    createPostTags: Array<Tag>
    selectedUserIds: Array<number>
}

const initialState: TagState = {
    tags: [],
    createPostTags: [],
    selectedUserIds: [],
    errors: {},
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
    async ({ clubId, name, userIdList }: { clubId: number, name: string, userIdList: Array<number> }) => {
        const basicTag = await ClubAPI.createClubTag(clubId, name, userIdList)
        const tag = TagAPI.getTag(basicTag.id)
        return tag
    },
)

export const editTag = createAsyncThunk<Tag | undefined, { tagId: number, tag: EditTag }, { rejectValue: APIErrorType }>(
    'tag/editTag',
    async ({ tagId, tag }: { tagId: number, tag: EditTag }, { rejectWithValue }) => {
        try {
            return await TagAPI.editTag(tagId, tag)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorType = APIError.getErrorType(e.response?.status)
                let message: string = errorType.message

                if (errorType.errorCode === 400) {
                    message = '태그에 포함할 유저를 선택해주세요.'
                }

                return rejectWithValue({
                    ...errorType,
                    message,
                })
            }
        }
    },
)

export const deleteTag = createAsyncThunk<void, number, { rejectValue: APIErrorType }>(
    'tag/deleteTag',
    async (tagId: number, { rejectWithValue }) => {
        try {
            return await TagAPI.deleteTag(tagId)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorType = APIError.getErrorType(e.response?.status)
                return rejectWithValue(errorType)
            }
        }
    },
)

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        setSelectedTag: (state, action: PayloadAction<Tag | undefined>) => {
            state.selectedTag = action.payload
        },
        resetCreatePostTags: (state) => {
            state.createPostTags = state.tags.filter(tag => tag.isDefault)
        },
        setCreatePostTags: (state, action: PayloadAction<Array<Tag>>) => {
            state.createPostTags = action.payload
        },
        toggleCreatePostTagSelection: (state, action: PayloadAction<Tag>) => {
            const tag = action.payload
            const temp = state.createPostTags

            if (temp.some(item => item.id === tag.id)) {
                state.createPostTags = temp.filter(item => item.id !== tag.id)
            } else {
                state.createPostTags = temp.concat(tag)
            }
        },
        resetSelectedUsers: (state) => {
            state.selectedUserIds = []
        },
        selectUser: (state, action: PayloadAction<number>) => {
            state.selectedUserIds = state.selectedUserIds.concat(action.payload)
        },
        deselectUser: (state, action) => {
            state.selectedUserIds = state.selectedUserIds.filter(userId => userId !== action.payload)
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
            state.errors = {}
        })
        builder.addCase(deleteTag.rejected, (state, action) => {
            state.errors.deleteTagError = action.payload
            state.selectedTag = undefined
        })
        builder.addCase(editTag.fulfilled, (state, action) => {
            state.selectedTag = action.payload
            state.tags = state.tags.map(tag => {
                if (tag.id === action.payload?.id) {
                    return {
                        ...tag,
                        users: action.payload ? action.payload.users : tag.users,
                        name: action.payload ? action.payload.name : tag.name,
                    }
                }
                return tag
            })
        })
        builder.addCase(editTag.rejected, (state, action) => {
            state.errors.editTagError = action.payload
            state.selectedTag = undefined
        })
        builder.addCase(createTag.fulfilled, (state, action) => {
            state.selectedTag = action.payload
            state.tags = state.tags.concat(action.payload)
        })
    },
})

export const tagActions = {
    ...tagSlice.actions,
    getTags,
    getTag,
    deleteTag,
    editTag,
    createTag,
}
export const tagReducer = tagSlice.reducer

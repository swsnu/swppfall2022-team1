import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { Club } from '../../model/Club'
import { ClubUser } from '../../model/ClubUser'
import { DefaultErrorType, IncorrectFields, UserIsNotAdminErrorType } from '../index'

export type ClubRegisterAPIErrorType = 'already_registered' | 'invalid_code' | DefaultErrorType
export type ClubEditAPIErrorType = UserIsNotAdminErrorType | DefaultErrorType | IncorrectFields
export type ClubDeleteAPIErrorType = UserIsNotAdminErrorType | DefaultErrorType
interface ClubErrorType {
    registerError?: ClubRegisterAPIErrorType
    editError?: ClubEditAPIErrorType
    deleteError?: ClubDeleteAPIErrorType
}

export interface ClubState {
    selectedClub?: Club
    myClubs: Array<Club>
    members: Array<ClubUser>
    clubRegisterError?: ClubRegisterAPIErrorType
    clubEditError?: ClubEditAPIErrorType
    errors: ClubErrorType
}

const initialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
}

export const getMyClubs = createAsyncThunk(
    'club/getMyClubs',
    async () => {
        return ClubAPI.getClubs()
    },
)

export const getClub = createAsyncThunk(
    'club/getClub',
    async (clubId: number) => {
        return ClubAPI.getClub(clubId)
    },
)

export const registerClub = createAsyncThunk<Club | undefined, string, { rejectValue: ClubRegisterAPIErrorType }>(
    'club/registerClub',
    async (code: string, { rejectWithValue }) => {
        try {
            return await ClubAPI.registerClub(code)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 400) {
                    return rejectWithValue('already_registered')
                } else if (e.response?.status === 404) {
                    return rejectWithValue('invalid_code')
                } else {
                    return rejectWithValue('error')
                }
            }
        }
    },
)

export const createClub = createAsyncThunk(
    'club/createClub',
    async (name: string) => {
        return await ClubAPI.createClub(name)
    },
)

export const editClub =
    createAsyncThunk<Club | undefined, { clubId: number, club: Club }, { rejectValue: ClubEditAPIErrorType }>(
        'club/editClub',
        async ({ clubId, club }, { rejectWithValue }) => {
            try {
                return await ClubAPI.editClub(clubId, club)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    if (e.response?.status === 403) {
                        return rejectWithValue('is_not_admin')
                    } else if (e.response?.status === 400) {
                        return rejectWithValue('incorrect_fields')
                    } else {
                        return rejectWithValue('error')
                    }
                }
            }
        },
    )

export const leaveClub = createAsyncThunk(
    'club/leaveClub',
    async () => { return },
)

export const deleteClub = createAsyncThunk<void, number, { rejectValue: ClubDeleteAPIErrorType }>(
    'club/deleteClub',
    async (clubId: number, { rejectWithValue }) => {
        try {
            return await ClubAPI.deleteClub(clubId)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 403) {
                    return rejectWithValue('is_not_admin')
                } else {
                    return rejectWithValue('error')
                }
            }
        }
    },
)

export const getClubMembers = createAsyncThunk(
    'club/getClubMembers',
    async (clubId: number) => {
        return ClubAPI.getClubMembers(clubId)
    },
)

export const removeClubMember = createAsyncThunk(
    'club/removeClubMember',
    async () => { return },
)

export const assignClubMemberRole = createAsyncThunk(
    'club/assignClubMemberRole',
    async () => { return },
)

export const createClubTag = createAsyncThunk(
    'club/createTag',
    async ({ clubId, tagName, userIds }: { clubId: number, tagName: string, userIds: number[] }) => {
        return ClubAPI.createClubTag(clubId, tagName, userIds)
    },
)

const clubSlice = createSlice({
    name: 'club',
    initialState,
    reducers: {
        resetClubRegisterErrror: (state) => {
            state.clubRegisterError = undefined
        },
        resetErrors: (state) => {
            state.errors = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMyClubs.fulfilled, (state, action) => {
            state.myClubs = action.payload
        })
        builder.addCase(getClub.fulfilled, (state, action) => {
            state.selectedClub = action.payload
        })
        builder.addCase(getClub.rejected, (state) => {
            state.selectedClub = undefined
        })
        builder.addCase(getClubMembers.fulfilled, (state, action) => {
            state.members = action.payload
        })
        builder.addCase(registerClub.fulfilled, (state, action) => {
            state.selectedClub = action.payload
        })
        builder.addCase(createClub.fulfilled, (state, action) => {
            state.selectedClub = action.payload
            state.myClubs = state.myClubs.concat(action.payload)
        })
        builder.addCase(registerClub.rejected, (state, action) => {
            state.clubRegisterError = action.payload
            state.selectedClub = undefined
        })
        builder.addCase(editClub.rejected, (state, action) => {
            state.errors.editError = action.payload
        })
        builder.addCase(deleteClub.rejected, (state, action) => {
            state.errors.deleteError = action.payload
        })
    },
})

export const clubActions = {
    ...clubSlice.actions,
    getMyClubs,
    getClub,
    getClubMembers,
    registerClub,
    createClub,
    createClubTag,
    editClub,
    deleteClub,
}
export const clubReducer = clubSlice.reducer

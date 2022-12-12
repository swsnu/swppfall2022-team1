import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { Club } from '../../model/Club'
import { ClubUser } from '../../model/ClubUser'
import { APIError, APIErrorType } from '../ErrorHandler'

export interface ClubErrorType {
    registerError?: APIErrorType
    editError?: APIErrorType
    deleteError?: APIErrorType
}

export interface ClubState {
    selectedClub?: Club
    myClubs: Array<Club>
    members: Array<ClubUser>
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

export const registerClub = createAsyncThunk<Club | undefined, string, { rejectValue: APIErrorType }>(
    'club/registerClub',
    async (code: string, { rejectWithValue }) => {
        try {
            return await ClubAPI.registerClub(code)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorType = APIError.getErrorType(e.response?.status)
                if (errorType.errorCode === 400) {
                    errorType.message = '이미 가입된 동아리입니다.'
                } else if (errorType.errorCode === 404) {
                    errorType.message = '유효하지 않은 코드입니다.'
                }
                return rejectWithValue(errorType)
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
    createAsyncThunk<Club | undefined, { clubId: number, club: Club }, { rejectValue: APIErrorType }>(
        'club/editClub',
        async ({ clubId, club }, { rejectWithValue }) => {
            try {
                return await ClubAPI.editClub(clubId, club)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    const errorType = APIError.getErrorType(e.response?.status)
                    if (errorType.errorCode === 400) {
                        errorType.message = '모든 필드를 알맞게 입력해주세요.'
                    }
                    return rejectWithValue(errorType)
                }
            }
        },
    )

export const leaveClub = createAsyncThunk(
    'club/leaveClub',
    async () => { return },
)

export const deleteClub = createAsyncThunk<void, number, { rejectValue: APIErrorType }>(
    'club/deleteClub',
    async (clubId: number, { rejectWithValue }) => {
        try {
            return await ClubAPI.deleteClub(clubId)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorType = APIError.getErrorType(e.response?.status)
                return rejectWithValue(errorType)
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
        builder.addCase(createClub.fulfilled, (state, action) => {
            state.selectedClub = action.payload
            state.myClubs = state.myClubs.concat(action.payload)
        })
        builder.addCase(createClub.rejected, (state) => {
            state.selectedClub = undefined
        })
        builder.addCase(registerClub.fulfilled, (state, action) => {
            const club = action.payload
            state.selectedClub = action.payload
            if (club) {
                state.myClubs = state.myClubs.concat(club)
            }
        })
        builder.addCase(registerClub.rejected, (state, action) => {
            state.errors.registerError = action.payload
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

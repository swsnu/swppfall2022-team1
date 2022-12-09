import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { Club } from '../../model/Club'
import { ClubUser } from '../../model/ClubUser'

export type ClubRegisterAPIErrorType = 'already_registered' | 'invalid_code' | 'error'

export interface ClubState {
    selectedClub?: Club
    myClubs: Array<Club>
    members: Array<ClubUser>
    clubRegisterError?: ClubRegisterAPIErrorType
}

const initialState: ClubState = {
    myClubs: [],
    members: [],
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
    async () => { return },
)

export const editClub = createAsyncThunk(
    'club/editClub',
    async () => { return },
)

export const leaveClub = createAsyncThunk(
    'club/leaveClub',
    async () => { return },
)

export const deleteClub = createAsyncThunk(
    'club/deleteClub',
    async () => { return },
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

const clubSlice = createSlice({
    name: 'club',
    initialState,
    reducers: {
        resetClubRegisterErrror: (state) => {
            state.clubRegisterError = undefined
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
        builder.addCase(registerClub.rejected, (state, action) => {
            state.clubRegisterError = action.payload
            state.selectedClub = undefined
        })
    },
})

export const clubActions = {
    ...clubSlice.actions,
    getMyClubs,
    getClub,
    getClubMembers,
    registerClub,
}
export const clubReducer = clubSlice.reducer

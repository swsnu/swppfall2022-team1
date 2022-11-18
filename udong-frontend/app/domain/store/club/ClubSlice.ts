import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { Club } from '../../model/Club'

export interface ClubState {
    selectedClub?: Club
    myClubs: Array<Club>
}

const initialState: ClubState = {
    myClubs: [],
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

export const registerClub = createAsyncThunk(
    'club/registerClub',
    async () => { return },
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
    async () => { return },
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyClubs.fulfilled, (state, action) => {
            state.myClubs = action.payload
        })
        builder.addCase(getClub.fulfilled, (state, action) => {
            state.selectedClub = action.payload
        })
    },
})

export const clubActions = {
    ...clubSlice.actions,
    getMyClubs,
    getClub,
}
export const clubReducer = clubSlice.reducer

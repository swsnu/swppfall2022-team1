import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Club } from '../../model/Club'

interface ClubState {
    selectedClub?: Club
}

const initialState: ClubState = {
}

export const getMyClubs = createAsyncThunk(
    'club/getMyClubs',
    async () => { return },
)

export const getClub = createAsyncThunk(
    'club/getClub',
    async () => { return },
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
})

export const clubActions = clubSlice.actions
export const clubReducer = clubSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

import { Club } from '../../model/Club'

interface ClubState {
    selectedClub?: Club
}

const initialState: ClubState = {
}

// TODO: actions

const clubSlice = createSlice({
    name: 'club',
    initialState,
    reducers: {},
})

export const clubActions = clubSlice.actions
export const clubReducer = clubSlice.reducer

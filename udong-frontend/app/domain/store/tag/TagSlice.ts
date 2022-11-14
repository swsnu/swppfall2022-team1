import { createSlice } from '@reduxjs/toolkit'

import { Tag } from '../../model/Tag'

interface TagState {
    selectedTag?: Tag
}

const initialState: TagState = {
}

// TODO: actions

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {},
})

export const tagActiosn = tagSlice.actions
export const tagReducer = tagSlice.reducer

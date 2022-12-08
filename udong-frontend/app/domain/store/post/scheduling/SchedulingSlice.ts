import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { SchedulingAPI } from '../../../../infra/api/SchedulingAPI'
import { SchedulingPost } from '../../../model/SchedulingPost'

interface SchedulingState {
    isOpen: boolean
    schedulingStatus?: SchedulingPost
}

const initialState: SchedulingState = {
    isOpen: false,
}

export const participateInScheduling = createAsyncThunk(
    'scheduling/participateInScheduling',
    async () => { return },
)

export const getSchedulingStatus = createAsyncThunk(
    'scheduling/getSchedulingStatus',
    async (postId: number) => { return SchedulingAPI.getSchedulingStatus(postId) },
)

export const closeScheduling = createAsyncThunk(
    'scheduling/closeScheduling',
    async () => { return },
)

const schedulingSlice = createSlice({
    name: 'scheduling',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSchedulingStatus.fulfilled, (state, action) => {
            state.schedulingStatus = action.payload
        })
    },
})

export const schedulingActions = { ...schedulingSlice.actions, getSchedulingStatus }
export const schedulingReducer = schedulingSlice.reducer

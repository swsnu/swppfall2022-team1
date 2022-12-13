import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { EventAPI } from '../../../infra/api/EventAPI'
import { ClubEvent } from '../../model/ClubEvent'
import { Time } from '../../model/Time'
import { createPost } from '../post/PostSlice'

export type EventCreateAPIErrorType = 'missing_required_field' | 'is_not_admin' | 'error'

export interface EventState {
    selectedEvent?: ClubEvent
    createEventError?: EventCreateAPIErrorType
    events: Array<ClubEvent>
}

const initialState: EventState = {
    events: [],
}

export const getEvents = createAsyncThunk(
    'event/getEvents',
    async (clubId: number) => {
        return await ClubAPI.getClubEvents(clubId)
    },
)

export const getEvent = createAsyncThunk(
    'event/getEvent',
    async (eventId: number) => {
        return await EventAPI.getEvent(eventId)
    },
)

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async ({ clubId, name, times } : { clubId: number, name: string, times: Array<Time> }) => {
        return await ClubAPI.createClubEvent(clubId, name, times)
    },
)

export const editEvent = createAsyncThunk(
    'event/editEvent',
    async ({ eventId, name, time }: { eventId: number, name: string | null, time: Time[] | null }) => {
        return await EventAPI.editEvent(eventId, name, time)
    },
)

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (eventId: number) => {
        return await EventAPI.deleteEvent(eventId)
    },
)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.events = action.payload
        })
        builder.addCase(getEvent.fulfilled, (state, action) => {
            state.selectedEvent = action.payload
        })
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.selectedEvent = action.payload
        })
        builder.addCase(createPost.rejected, (state, action) => {
            state.selectedEvent = undefined
            state.createEventError = action.payload
        })
    },
})

export const eventActions = {
    ...eventSlice.actions,
    getEvents,
    getEvent,
    createEvent,
    editEvent,
    deleteEvent,
}
export const eventReducer = eventSlice.reducer

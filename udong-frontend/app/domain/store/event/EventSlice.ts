import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { EventAPI } from '../../../infra/api/EventAPI'
import { ClubEvent } from '../../model/ClubEvent'

export interface EventState {
    selectedEvent?: ClubEvent
    events: Array<ClubEvent>
}

const initialState: EventState = {
    events: [],
}

export const getEvents = createAsyncThunk(
    'event/getEvents',
    async (clubId: number) => {
        return ClubAPI.getClubEvents(clubId)
    },
)

export const getEvent = createAsyncThunk(
    'event/getEvent',
    async () => { return },
)

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async () => { return },
)

export const editEvent = createAsyncThunk(
    'event/editEvent',
    async ({ eventId, content }: { eventId: number, content: Partial<ClubEvent> }) => {
        return EventAPI.editEvent(eventId, content)
    },
)

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async () => { return },
)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.events = action.payload
        })
    },
})

export const eventActions = {
    ...eventSlice.actions,
    editEvent,
    getEvents,
}
export const eventReducer = eventSlice.reducer

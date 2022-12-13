import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { EventAPI } from '../../../infra/api/EventAPI'
import { ClubEvent } from '../../model/ClubEvent'
import { Time } from '../../model/Time'

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
    (eventId: number) => {
        return EventAPI.getEvent(eventId)
    },
)

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async () => { return },
)

export const editEvent = createAsyncThunk(
    'event/editEvent',
    async ({ eventId, name, time }: { eventId: number, name: string | null, time: Time[] | null }) => {
        return EventAPI.editEvent(eventId, name, time)
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
        builder.addCase(getEvent.fulfilled, (state, action) => {
            state.selectedEvent = action.payload
        })
    },
})

export const eventActions = {
    ...eventSlice.actions,
    editEvent,
    getEvents,
    getEvent,
}
export const eventReducer = eventSlice.reducer

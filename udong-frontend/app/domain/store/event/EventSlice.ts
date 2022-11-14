import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Event } from '../../model/Event'

interface EventState {
    selectedEvent?: Event
}

const initialState: EventState = {
}

export const getEvents = createAsyncThunk(
    'event/getEvents',
    async () => { return },
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
    async () => { return },
)

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async () => { return },
)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
})

export const eventActions = eventSlice.actions
export const eventReducer = eventSlice.reducer

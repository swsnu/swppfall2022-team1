import { createSelector } from 'reselect'

import { RootState } from '../index'

const eventState = (state: RootState) => state.event

const selectedEvent = createSelector(
    eventState,
    state => state.selectedEvent,
)

const events = createSelector(
    eventState,
    state => state.events,
)

const errors = createSelector(
    eventState,
    state => state.errors,
)

const upsertedEventId = createSelector(
    eventState,
    state => state.upsertedEventId,
)

export const eventSelector = {
    selectedEvent,
    events,
    errors,
    upsertedEventId,
}

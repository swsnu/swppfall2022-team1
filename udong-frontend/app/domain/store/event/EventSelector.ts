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

export const eventSelector = {
    selectedEvent,
    events,
}

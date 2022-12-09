import { createSelector } from 'reselect'

import { RootState } from '../../index'

const schedulingState = (state: RootState) => state.scheduling

const isOpen = createSelector(
    schedulingState,
    state => state.isOpen,
)

const schedulingStatus = createSelector(
    schedulingState,
    state => state.schedulingStatus,
)

export const schedulingSelector = {
    isOpen,
    schedulingStatus,
}

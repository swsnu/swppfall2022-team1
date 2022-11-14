import { createSelector } from 'reselect'

import { RootState } from '../../index'

const schedulingState = (state: RootState) => state.scheduling

const isOpen = createSelector(
    schedulingState,
    state => state.isOpen,
)

export const schedulingSelector = {
    isOpen,
}

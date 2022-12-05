import { createSelector } from 'reselect'

import { RootState } from '../../index'

const enrollmentState = (state: RootState) => state.enrollment

const isOpen = createSelector(
    enrollmentState,
    state => state.isOpen,
)

const selectedEnrollmentStatus = createSelector(
    enrollmentState,
    state => state.selectedEnrollmentStatus,
)

export const enrollmentSelector = {
    isOpen,
    selectedEnrollmentStatus,
}

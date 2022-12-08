import { createSelector } from 'reselect'

import { RootState } from '../../index'

const enrollmentState = (state: RootState) => state.enrollment

const selectedEnrollmentStatus = createSelector(
    enrollmentState,
    state => state.selectedEnrollmentStatus,
)

export const enrollmentSelector = {
    selectedEnrollmentStatus,
}

import { createSelector } from 'reselect'

import { RootState } from '../../index'

const enrollmentState = (state: RootState) => state.enrollment

const selectedEnrollmentUsers = createSelector(
    enrollmentState,
    state => state.selectedEnrollmentUsers,
)

export const enrollmentSelector = {
    selectedEnrollmentUsers,
}

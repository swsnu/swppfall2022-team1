import { createSelector } from 'reselect'

import { RootState } from '../../index'

const enrollmentState = (state: RootState) => state.enrollment

const selectedEnrollmentUsers = createSelector(
    enrollmentState,
    state => state.selectedEnrollmentUsers,
)

const hasSuccessfullyClosed = createSelector(
    enrollmentState,
    state => state.selectedEnrollment ? state.selectedEnrollment.closed : false,
)

const isParticipating = createSelector(
    enrollmentState,
    state => state.isParticipating,
)

export const enrollmentSelector = {
    selectedEnrollmentUsers,
    hasSuccessfullyClosed,
    isParticipating,
}

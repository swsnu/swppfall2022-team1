import { createSelector } from 'reselect'

import { RootState } from '../index'

const clubState = (state: RootState) => state.club

const selectedClub = createSelector(
    clubState,
    state => state.selectedClub,
)

const myClubs = createSelector(
    clubState,
    state => state.myClubs,
)

const members = createSelector(
    clubState,
    state => state.members,
)

const errors = createSelector(
    clubState,
    state => state.errors,
)

const selectedMember = createSelector(
    clubState,
    state => state.selectedMember,
)

export const clubSelector = {
    selectedClub,
    myClubs,
    members,
    errors,
    selectedMember,
}

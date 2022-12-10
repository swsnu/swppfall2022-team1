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

const clubRegisterError = createSelector(
    clubState,
    state => state.clubRegisterError,
)

const errors = createSelector(
    clubState,
    state => state.errors,
)

export const clubSelector = {
    selectedClub,
    myClubs,
    members,
    clubRegisterError,
    errors,
}

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

export const clubSelector = {
    selectedClub,
    myClubs,
}

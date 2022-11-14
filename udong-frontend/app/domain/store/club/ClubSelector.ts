import { createSelector } from 'reselect'

import { RootState } from '../index'

const clubState = (state: RootState) => state.club

const selectedClub = createSelector(
    clubState,
    state => state.selectedClub,
)

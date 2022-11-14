import { createSelector } from 'reselect'

import { RootState } from '../index'

const authState = (state: RootState) => state.auth

const isLoggedIn = createSelector(
    authState,
    state => state.isLoggedIn,
)

export const authSelector = {
    isLoggedIn,
}

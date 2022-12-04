import { createSelector } from 'reselect'

import { RootState } from '../index'

const authState = (state: RootState) => state.auth

const isLoggedIn = createSelector(
    authState,
    state => state.isLoggedIn,
)

const isLoading = createSelector(
    authState,
    state => state.isLoading,
)

export const authSelector = {
    isLoggedIn,
    isLoading,
}

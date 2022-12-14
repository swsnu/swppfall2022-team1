import { createSelector } from 'reselect'

import { RootState } from '../index'

const userState = (state: RootState) => state.user

const userMe = createSelector(
    userState,
    state => state.me,
)

const selectedUser = createSelector(
    userState,
    state => state.selectedUser,
)

const isAdmin = createSelector(
    userState,
    state => state.isAdmin,
)

const errors = createSelector(
    userState,
    state => state.errors,
)

export const userSelector = {
    userMe,
    selectedUser,
    isAdmin,
    errors,
}

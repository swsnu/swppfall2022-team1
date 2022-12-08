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

export const userSelector = {
    userMe,
    selectedUser,
    isAdmin,
}

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

export const userSelector = {
    userMe,
    selectedUser,
}

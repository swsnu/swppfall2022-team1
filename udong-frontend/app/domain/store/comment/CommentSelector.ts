import { createSelector } from 'reselect'

import { RootState } from '../index'

const commentState = (state: RootState) => state.comment

const selectedComment = createSelector(
    commentState,
    state => state.selectedComment,
)

export const commentSelector = {
    selectedComment,
}

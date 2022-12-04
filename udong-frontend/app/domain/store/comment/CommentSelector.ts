import { createSelector } from 'reselect'

import { RootState } from '../index'

const commentState = (state: RootState) => state.comment

const selectedComment = createSelector(
    commentState,
    state => state.selectedComment,
)

const postComments = createSelector(
    commentState,
    state => state.postComments,
)

export const commentSelector = {
    selectedComment,
    postComments,
}

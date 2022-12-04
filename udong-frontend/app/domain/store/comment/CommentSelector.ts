import { createSelector } from 'reselect'

import { RootState } from '../index'

const commentState = (state: RootState) => state.comment

const selectedCommentId = createSelector(
    commentState,
    state => state.selectedCommentId,
)

const postComments = createSelector(
    commentState,
    state => state.postComments,
)

export const commentSelector = {
    selectedCommentId,
    postComments,
}

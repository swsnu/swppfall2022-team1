import { createSelector } from 'reselect'

import { RootState } from '../index'

const postState = (state: RootState) => state.post

const selectedPost = createSelector(
    postState,
    state => state.selectedPost,
)

const comments = createSelector(
    postState,
    state => state.comments,
)

export const postSelector = {
    selectedPost,
    comments,
}

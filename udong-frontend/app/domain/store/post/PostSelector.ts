import { createSelector } from 'reselect'

import { RootState } from '../index'

const postState = (state: RootState) => state.post

const selectedPost = createSelector(
    postState,
    state => state.selectedPost,
)

const feedPosts = createSelector(
    postState,
    state => state.feedPosts,
)

const clubPosts = createSelector(
    postState,
    state => state.clubPosts,
)

const eventPosts = createSelector(
    postState,
    state => state.eventPosts,
)

const createdPostId = createSelector(
    postState,
    state => state.createdPostId,
)

const errors = createSelector(
    postState,
    state => state.errors,
)

export const postSelector = {
    selectedPost,
    feedPosts,
    clubPosts,
    eventPosts,
    createdPostId,
    errors,
}

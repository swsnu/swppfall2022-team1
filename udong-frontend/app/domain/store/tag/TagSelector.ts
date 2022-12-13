import { createSelector } from 'reselect'

import { RootState } from '../index'

const tagState = (state: RootState) => state.tag

const selectedTag = createSelector(
    tagState,
    state => state.selectedTag,
)

const tags = createSelector(
    tagState,
    state => state.tags,
)

const createPostTags = createSelector(
    tagState,
    state => state.createPostTags,
)

const selectedUserIds = createSelector(
    tagState,
    state => state.selectedUserIds,
)

const errors = createSelector(
    tagState,
    state => state.errors,
)

export const tagSelector = {
    selectedTag,
    tags,
    createPostTags,
    selectedUserIds,
    errors,
}

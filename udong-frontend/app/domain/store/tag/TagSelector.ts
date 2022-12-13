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

export const tagSelector = {
    selectedTag,
    tags,
    createPostTags,
}

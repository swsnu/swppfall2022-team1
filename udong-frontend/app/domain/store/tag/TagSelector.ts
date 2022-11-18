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

export const tagSelector = {
    selectedTag,
    tags,
}

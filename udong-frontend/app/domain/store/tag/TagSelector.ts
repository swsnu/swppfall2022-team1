import { createSelector } from 'reselect'

import { RootState } from '../index'

const tagState = (state: RootState) => state.tag

const selectedTag = createSelector(
    tagState,
    state => state.selectedTag,
)

export const tagSelector = {
    selectedTag,
}

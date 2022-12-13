import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../domain/model/User'
import { tagReducer, TagState } from '../../../../domain/store/tag/TagSlice'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { ClickableTag } from '../ClickableTag'

const stubTagInitialState: TagState = {
    tags: [],
    createPostTags: [],
    errors: {},
    selectedUserIds: [],
    selectedTag: { users: [], id: 1, name: 'TAG', isDefault: true, createdAt: '', updatedAt: '' },
}

const stubUserInitialState: UserState = {
    isAdmin: true,
    selectedUser: dummyUserMe,
    me: dummyUserMe,
}

const mockStore = configureStore({
    reducer: { tag: tagReducer, user: userReducer },
    preloadedState: { tag: stubTagInitialState, user: stubUserInitialState },
})

describe('<ClickableTag/>', () => {
    it ('render clickable tag & handle click', () => {
        render(
            <Provider store={mockStore}>
                <ClickableTag
                    tag={{ id: 1, name: 'TAG', isDefault: true, createdAt: '', updatedAt: '' }}
                    isIncluded={true}
                />
            </Provider>,
        )
        const component = screen.getByText('TAG')
        expect(component).toBeDefined()
    })
})

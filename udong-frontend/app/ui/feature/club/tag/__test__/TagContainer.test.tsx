import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { tagReducer, TagState } from '../../../../../domain/store/tag/TagSlice'
import { userReducer, UserState } from '../../../../../domain/store/user/UserSlice'
import { TagContainer } from '../TagContainer'

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
}

const stubInitialState: TagState = {
    tags: [{
        id: 1,
        name: 'TAG',
        createdAt: '',
        updatedAt: '',
        users: [],
        isDefault: false,
    }],
    createPostTags: [],
    errors: {},
    selectedUserIds: [],
}

const stubUserInitialState: UserState = {
    errors: {},
    isAdmin: true,
    me: {
        id: 1,
        email: '',
        imageUrl: '',
        name: '',
        timeTable: [],
    },
}

const mockStore = configureStore({
    reducer: { tag: tagReducer, user: userReducer, club: clubReducer },
    preloadedState: { tag: stubInitialState, user: stubUserInitialState, club: stubClubInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<TagContainer/>', () => {
    const tagContainer: JSX.Element = (
        <Provider store={mockStore}>
            <TagContainer clubId={1}/>
        </Provider>
    )

    it ('render tag container', () => {
        render(tagContainer)
        const component = screen.getByText('태그 추가하기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })

    it ('should test click tag item', () => {
        render(tagContainer)
        const component = screen.getByText('TAG')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})

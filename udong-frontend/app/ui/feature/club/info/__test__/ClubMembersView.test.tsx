import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../../domain/model/User'
import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { userReducer, UserState } from '../../../../../domain/store/user/UserSlice'
import { ClubMembersView } from '../ClubMembersView'

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
}

const stubUserInitialState: UserState = {
    isAdmin: false,
    selectedUser: dummyUserMe,
}

const mockStore = configureStore({
    reducer: { club: clubReducer, user: userReducer },
    preloadedState: { club: stubClubInitialState, user: stubUserInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<ClubMembersView/>', () => {
    it('should render club members view', () => {
        render(
            <Provider store={mockStore}>
                <ClubMembersView clubId={1}/>
            </Provider>,
        )
        const text = screen.getByText('동아리 인원')
        expect(text).toBeDefined()
    })
})

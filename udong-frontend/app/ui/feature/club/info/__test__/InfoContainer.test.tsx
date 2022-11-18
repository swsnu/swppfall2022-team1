import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../../domain/model/User'
import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { userReducer, UserState } from '../../../../../domain/store/user/UserSlice'
import { InfoContainer } from '../InfoContainer'

const stubUserInitialState: UserState = {
    selectedUser: dummyUserMe,
}

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
}

const mockStore = configureStore({
    reducer: { user: userReducer, club: clubReducer },
    preloadedState: { user: stubUserInitialState, club: stubClubInitialState },
})

describe('<InfoContainer/>', () => {
    it('should render info container', () => {
        render(<Provider store={mockStore}>
            <InfoContainer clubId={1}/>
        </Provider>,
        )
        const text = screen.getByText('탈퇴하기')
        expect(text).toBeDefined()
    })
})

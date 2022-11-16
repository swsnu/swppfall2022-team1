import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../../domain/model/User'
import { userReducer, UserState } from '../../../../../domain/store/user/UserSlice'
import { ClubMembersView } from '../ClubMembersView'

const stubInitialState: UserState = {
    selectedUser: dummyUserMe,
}

const mockStore = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: stubInitialState },
})

describe('<ClubMembersView/>', () => {
    it('should render club members view', () => {
        render(
            <Provider store={mockStore}>
                <ClubMembersView/>
            </Provider>,
        )
        const text = screen.getByText('동아리 인원')
        expect(text).toBeDefined()
    })
})

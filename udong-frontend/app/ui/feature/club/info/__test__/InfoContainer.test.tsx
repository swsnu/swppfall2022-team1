import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../../domain/model/User'
import { userReducer, UserState } from '../../../../../domain/store/user/UserSlice'
import { InfoContainer } from '../InfoContainer'

const stubInitialState: UserState = {
    selectedUser: dummyUserMe,
}

const mockStore = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: stubInitialState },
})

describe('<InfoContainer/>', () => {
    it('should render info container', () => {
        render(<Provider store={mockStore}>
            <InfoContainer/>
        </Provider>,
        )
        const text = screen.getByText('탈퇴하기')
        expect(text).toBeDefined()
    })
})

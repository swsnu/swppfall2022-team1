import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../domain/model/User'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { UserListModal } from '../UserListModal'

const stubInitialState: UserState = {
    isAdmin: false,
    selectedUser: dummyUserMe,
    me: { id: 1, name: '', timeTable: [], imageUrl: '', email: '' },
}

const mockStore = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: stubInitialState },
})

describe('<UserListModal/>', () => {
    it ('should render user list modal', () => {
        render(
            <Provider store={mockStore}>
                <UserListModal
                    users={[]}
                    isOpen={true}
                    setIsOpen={() => {return}}
                    title={'USER'}
                />
            </Provider>,
        )
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})

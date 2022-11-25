import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { ClubUser } from '../../../../domain/model/ClubUser'
import { RoleType } from '../../../../domain/model/RoleType'
import { dummyUserMe } from '../../../../domain/model/User'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { SearchMembersView } from '../SearchMembersView'

const dummyMembers: Array<ClubUser> = [{
    user: dummyUserMe,
    role: RoleType.ADMIN,
}]

const stubInitialState: UserState = {
    selectedUser: dummyUserMe,
}

const mockStore = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: stubInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<SearchMembersView/>', () => {
    it ('should render search members view and hanlde on click', () => {
        render(
            <Provider store={mockStore}>
                <SearchMembersView members={dummyMembers}/>
            </Provider>,
        )
        const component = screen.getAllByText('이유빈')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})

import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { ClubUser } from '../../../../domain/model/ClubUser'
import { RoleType } from '../../../../domain/model/RoleType'
import { dummyUserMe, dummyUserNotMe } from '../../../../domain/model/User'
import { clubReducer, ClubState } from '../../../../domain/store/club/ClubSlice'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { SearchMembersView } from '../SearchMembersView'

const dummyMembers: Array<ClubUser> = [{
    user: dummyUserMe,
    role: RoleType.ADMIN,
}]

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
    selectedMember: {
        role: RoleType.MEMBER,
        user: dummyUserNotMe,
    },
}

const stubInitialState: UserState = {
    isAdmin: false,
    selectedUser: dummyUserMe,
    errors: {},
}

const mockStore = configureStore({
    reducer: { user: userReducer, club: clubReducer },
    preloadedState: { user: stubInitialState, club: stubClubInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<SearchMembersView/>', () => {
    it ('should render search members view and hanlde on click', () => {
        const client = new QueryClient
        render(
            <QueryClientProvider client={client}>
                <Provider store={mockStore}>
                    <SearchMembersView
                        clubId={1}
                        members={dummyMembers}
                    />
                </Provider>
            </QueryClientProvider>,
        )
        const component = screen.getAllByText('이유빈')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})

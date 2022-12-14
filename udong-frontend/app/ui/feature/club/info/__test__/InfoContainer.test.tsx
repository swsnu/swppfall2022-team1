import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../../domain/model/User'
import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { userReducer, UserState } from '../../../../../domain/store/user/UserSlice'
import { InfoContainer } from '../InfoContainer'

const stubUserInitialState: UserState = {
    isAdmin: false,
    selectedUser: dummyUserMe,
    errors: {},
}

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
    selectedClub: {
        id: 1,
        name: '',
        code: '',
        image: '',
    },
}

const mockStore = configureStore({
    reducer: { user: userReducer, club: clubReducer },
    preloadedState: { user: stubUserInitialState, club: stubClubInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<InfoContainer/>', () => {
    it('should render info container', () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
        } as unknown as NextRouter))

        const client = new QueryClient()

        render(
            <QueryClientProvider client={client}>
                <Provider store={mockStore}>
                    <InfoContainer clubId={1}/>
                </Provider>,
            </QueryClientProvider>,
        )
        const text = screen.getByText('동아리 프로필')
        expect(text).toBeDefined()
    })
})

import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../domain/model/User'
import { authReducer, AuthState } from '../../../../domain/store/auth/AuthSlice'
import { clubReducer, ClubState } from '../../../../domain/store/club/ClubSlice'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { Header, HEADER_PAGE } from '../Header'

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

const stubAuthInitialState: AuthState = {
    isLoading: true,
    isLoggedIn: true,
}

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
    selectedClub: { id: 1, name: '단풍', image: '', code: '' },
}

const stubUserInitialState: UserState = {
    selectedUser: dummyUserMe,
    isAdmin: true,
}

const mockStore = configureStore({
    reducer: { auth: authReducer, club: clubReducer, user: userReducer },
    preloadedState: { auth: stubAuthInitialState, club: stubClubInitialState, user: stubUserInitialState },
})

const mockSession: Session = {
    expires: '',
    user: { email: '', id: '', name: '' },
    accessToken: '',
}

describe('<Header/>', () => {
    const client = new QueryClient()
    const header: JSX.Element = (
        <QueryClientProvider client={client}>
            <SessionProvider session={mockSession}>
                <Provider store={mockStore}>
                    <Header type={HEADER_PAGE.MAIN}/>
                </Provider>
            </SessionProvider>
        </QueryClientProvider>
    )

    const clubHeader: JSX.Element = (
        <QueryClientProvider client={client}>
            <SessionProvider session={mockSession}>
                <Provider store={mockStore}>
                    <Header
                        type={HEADER_PAGE.CLUB}
                        clubId={1}
                    />
                </Provider>
            </SessionProvider>
        </QueryClientProvider>
    )

    it('should render header', () => {
        render(header)
        const text = screen.getByText('로그아웃')
        expect(text).toBeDefined()
    })

    it('should handle navigate to home', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(header)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/')
    })

    it('should handle navigate to club', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(clubHeader)
        const component = screen.getByText('단풍')
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/club/1')
    })
})

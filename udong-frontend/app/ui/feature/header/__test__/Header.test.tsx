import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { Provider } from 'react-redux'

import { authReducer, AuthState } from '../../../../domain/store/auth/AuthSlice'
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

const mockStore = configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: stubAuthInitialState },
})

const mockSession: Session = {
    expires: '',
    user: { email: '', id: '', name: '' },
    accessToken: '',
}

describe('<Header/>', () => {
    const header: JSX.Element = (
        <SessionProvider session={mockSession}>
            <Provider store={mockStore}>
                <Header type={HEADER_PAGE.MAIN}/>
            </Provider>
        </SessionProvider>
    )

    const clubHeader: JSX.Element = (
        <SessionProvider session={mockSession}>
            <Provider store={mockStore}>
                <Header
                    type={HEADER_PAGE.CLUB}
                    clubId={1}
                />
            </Provider>
        </SessionProvider>
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

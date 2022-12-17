import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { authReducer, AuthState } from '../../../../domain/store/auth/AuthSlice'
import { LoginContainer } from '../LoginContainer'

const stubUserInitialState: AuthState = {
    isLoading: true,
    isLoggedIn: false,
}

export const mockStore = configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: stubUserInitialState },
})

jest.mock('next-auth/react', () => {
    const originalModule = jest.requireActual('next-auth/react')
    const mockSession = {
        expires: new Date(Date.now() + (2 * 86400)).toISOString(),
        user: { username: 'admin' },
    }
    return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => {
            return { data: mockSession, status: 'unauthenticated' }  // return type is [] in v3 but changed to {} in v4
        }),
    }
})

describe('<LoginContainer/>', () => {
    const LoginContainerWithStore = (
        <Provider store={mockStore}>
            <LoginContainer/>
        </Provider>
    )
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should render login container', async () => {
        render(LoginContainerWithStore)
        const images = screen.getAllByRole('img')
        expect(images).toBeDefined()
    })
})

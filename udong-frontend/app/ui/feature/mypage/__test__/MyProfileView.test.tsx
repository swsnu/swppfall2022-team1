import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../domain/model/User'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { MyProfileView } from '../MyProfileView'

const stubUserInitialState: UserState = {
    isAdmin: false,
    selectedUser: dummyUserMe,
    errors: {},
}

const mockStore = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: stubUserInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

test('renders MyPage', async () => {
    const client = new QueryClient()

    await act(async () => {
        render(
            <QueryClientProvider client={client}>
                <Provider store={mockStore}>
                    <MyProfileView me={dummyUserMe}/>
                </Provider>,
            </QueryClientProvider>,
        )
    })
    const quit = screen.getByText(/탈퇴하기/)
    await waitFor(() => expect(quit).toBeInTheDocument)
    fireEvent.click(quit)
})

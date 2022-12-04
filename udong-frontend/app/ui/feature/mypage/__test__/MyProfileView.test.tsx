import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../domain/model/User'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { MyProfileView } from '../MyProfileView'

const stubUserInitialState: UserState = {
    selectedUser: dummyUserMe,
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
    await act(async () => {
        render(
            <Provider store={mockStore}>
                <MyProfileView me={dummyUserMe}/>
            </Provider>,
        )
    })
    const quit = screen.getByText(/탈퇴하기/)
    await waitFor(() => expect(quit).toBeInTheDocument)
    fireEvent.click(quit)
})

import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../domain/model/User'
import { fakeUser1 } from '../../../../domain/store/__test__/UserSlice.test'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { AddMyScheduleView } from '../AddMyScheduleView'

const stubUserInitialState: UserState = {
    selectedUser: dummyUserMe,
    isAdmin: false,
    errors: {},
}

const mockStore = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: stubUserInitialState },
})

test('renders MyPage', async () => {
    // eslint-disable-next-line no-console
    await act(async () => {
        render(
            <Provider store={mockStore}>
                <AddMyScheduleView me={fakeUser1}/>
            </Provider>,
        )},
    )
    const btn = screen.getByText(/저장하기/)
    await waitFor(() => expect(btn).toBeInTheDocument)
    fireEvent.click(btn)
})

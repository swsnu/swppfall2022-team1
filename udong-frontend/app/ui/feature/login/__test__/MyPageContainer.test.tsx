import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import expect from 'expect'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../domain/model/User'
import { fakeUser1, fakeUserDto1 } from '../../../../domain/store/__test__/UserSlice.test'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { axiosConfig } from '../../../../infra/global'
import { MyPageContainer } from '../../mypage/MyPageContainer'

const stubUserInitialState: UserState = {
    me: fakeUser1,
    isAdmin: true,
    selectedUser: dummyUserMe,
    errors: {},
}

const mockStore = configureStore({
    reducer: {  user: userReducer },
    preloadedState: {  user: stubUserInitialState },
})

describe('<MyPageContainer/>', () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // ✅ turns retries off
                retry: false,
            },
        },
    })
    const MyPageContainerWithStore = (
        <QueryClientProvider client={queryClient}>
            <Provider store={mockStore}>
                <MyPageContainer/>
            </Provider>
        </QueryClientProvider>
    )
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should render my page container', async () => {
        jest.mock('react-query', () => ({
            useQuery: jest.fn().mockReturnValue(({ data: {}, isLoading: false, error: {} })),
        }))
        axiosConfig.get = jest.fn().mockResolvedValue(fakeUserDto1)
        render(MyPageContainerWithStore)
        const userName = screen.getByText('user')
        await waitFor(async () => {
            expect(userName).toBeDefined()
        })
    })
})

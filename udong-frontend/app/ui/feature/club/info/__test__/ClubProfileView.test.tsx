import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { Club } from '../../../../../domain/model/Club'
import { dummyUserMe } from '../../../../../domain/model/User'
import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { userReducer, UserState } from '../../../../../domain/store/user/UserSlice'
import { ClubProfileView } from '../ClubProfileView'

const testClub: Club = {
    id: 1,
    name: '',
    image: '',
    code: '',
    createdAt: '',
    updatedAt: '',
}

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
}

const stubUserInitialState: UserState = {
    isAdmin: true,
    selectedUser: dummyUserMe,
    errors: {},
}

const mockStore = configureStore({
    reducer: { club: clubReducer, user: userReducer },
    preloadedState: { club: stubClubInitialState, user: stubUserInitialState },
})

describe('<ClubProfileView/>', () => {
    it('should test on click delete', () => {
        const client = new QueryClient()

        render(
            <QueryClientProvider client={client}>
                <Provider store={mockStore}>
                    <ClubProfileView
                        club={testClub}
                    />
                </Provider>
            </QueryClientProvider>,
        )
        const text = screen.getByText('삭제하기')
        fireEvent.click(text)

        const modalText = screen.getByText('동아리 삭제')
        expect(modalText).toBeInTheDocument()
    })

    it('should test on click leave', () => {
        const client = new QueryClient()

        render(
            <QueryClientProvider client={client}>
                <Provider store={mockStore}>
                    <ClubProfileView
                        club={testClub}
                    />
                </Provider>
            </QueryClientProvider>,
        )
        const text = screen.getByText('탈퇴하기')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })
})

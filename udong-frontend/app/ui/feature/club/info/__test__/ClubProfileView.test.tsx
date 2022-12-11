import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { Club } from '../../../../../domain/model/Club'
import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { ClubProfileView } from '../ClubProfileView'

const testClub: Club = {
    id: 1,
    name: '',
    image: '',
    code: '',
}

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
}

const mockStore = configureStore({
    reducer: { club: clubReducer },
    preloadedState: { club: stubClubInitialState },
})

describe('<ClubProfileView/>', () => {
    it('should test on click delete', () => {
        render(
            <Provider store={mockStore}>
                <ClubProfileView
                    club={testClub}
                />
            </Provider>,
        )
        const text = screen.getByText('삭제하기')
        fireEvent.click(text)

        const modalText = screen.getByText('동아리 삭제')
        expect(modalText).toBeInTheDocument()
    })

    it('should test on click leave', () => {
        render(
            <Provider store={mockStore}>
                <ClubProfileView
                    club={testClub}
                />
            </Provider>,
        )
        const text = screen.getByText('탈퇴하기')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })
})

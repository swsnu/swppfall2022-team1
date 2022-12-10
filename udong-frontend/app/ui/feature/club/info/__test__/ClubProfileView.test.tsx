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
}

const mockStore = configureStore({
    reducer: { club: clubReducer },
    preloadedState: { club: stubClubInitialState },
})

describe('<ClubProfileView/>', () => {
    it('should test on click delete', () => {
        const mockOnDelete = jest.fn()
        render(
            <Provider store={mockStore}>
                <ClubProfileView
                    onClickDelete={() => {mockOnDelete()}}
                    club={testClub}
                />
            </Provider>,
        )
        const text = screen.getByText('삭제하기')
        fireEvent.click(text)
        expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })

    it('should test on click leave', () => {
        render(
            <Provider store={mockStore}>
                <ClubProfileView
                    onClickDelete={() => {return}}
                    club={testClub}
                />
            </Provider>,
        )
        const text = screen.getByText('탈퇴하기')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })
})

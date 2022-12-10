import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { CreateClubModal } from '../CreateClubModal'

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
}

const mockStore = configureStore({
    reducer: { club: clubReducer },
    preloadedState: { club: stubClubInitialState },
})

describe('<CreateClubModal/>', () => {
    it('renders create club modal', () => {
        render(
            <Provider store={mockStore}>
                <CreateClubModal
                    isOpen={true}
                    setIsOpen={() => {return}}
                />
            </Provider>,
        )
        const text = screen.getByText('동아리 생성')
        expect(text).toBeDefined()
    })

    it('test on click', () => {
        render(
            <Provider store={mockStore}>
                <CreateClubModal
                    isOpen={true}
                    setIsOpen={() => {return}}
                />
            </Provider>,
        )
        const text = screen.getByText('동아리 생성')
        const button = screen.getByText('생성하기')

        fireEvent.click(button)
        expect(text).toBeDefined()
    })
})

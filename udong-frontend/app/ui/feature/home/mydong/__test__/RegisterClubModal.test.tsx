import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { RegisterClubModal } from '../RegisterClubModal'

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
}

const mockStore = configureStore({
    reducer: { club: clubReducer },
    preloadedState: { club: stubClubInitialState },
})

describe('<RegisterClubModal/>', () => {
    it('renders add club modal', () => {
        render(
            <Provider store={mockStore}>
                <RegisterClubModal
                    isOpen={true}
                    setIsOpen={() => {return}}
                />
            </Provider>,
        )
        const text = screen.getByText('동아리 가입')
        expect(text).toBeDefined()
    })

    it('test on click', () => {
        render(
            <Provider store={mockStore}>
                <RegisterClubModal
                    isOpen={true}
                    setIsOpen={() => {return}}
                />
            </Provider>,
        )
        const text = screen.getByText('동아리 가입')
        const button = screen.getByText('가입하기')

        fireEvent.click(button)
        expect(text).toBeDefined()
    })
})

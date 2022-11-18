import { configureStore } from '@reduxjs/toolkit'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { Club } from '../../../../../domain/model/Club'
import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import dong from '../../../../icons/IcDong.png'
import { MyDongContainer } from '../MyDongContainer'

const stubInitialState: ClubState = {
    myClubs: [],
}

const mockStore = configureStore({
    reducer: { club: clubReducer },
    preloadedState: { club: stubInitialState },
})

jest.mock('../AddClubModal', () => ({
    AddClubModal: ({ isOpen }: { isOpen: boolean }) =>
        <div data-testid={'add-club-modal'}>{isOpen ? 'open' : 'close'}</div>,
}))

jest.mock('../ClubItem', () => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    ClubItem: ({ imageSrc, club }: { imageSrc: string, club: Club }) =>
        <div data-testid={'club-item'}>
            <img src={dong.src}/>
            <p>Udong</p>
        </div>,
}))

describe('<MyDongContainer/>', () => {
    it('renders my dong container', () => {
        render(<Provider store={mockStore}>
            <MyDongContainer/>
        </Provider>,
        )
        const img = screen.getAllByRole('img')
        expect(img).toBeDefined()
    })

    it('should test when add club modal is open', async () => {
        render(<Provider store={mockStore}>
            <MyDongContainer/>
        </Provider>,
        )
        const openButton = screen.getAllByRole('img')
        await act(async () => {
            fireEvent.click(openButton[0])
        })
        await waitFor(() => expect(screen.getByText('open')).toBeDefined())
    })
})

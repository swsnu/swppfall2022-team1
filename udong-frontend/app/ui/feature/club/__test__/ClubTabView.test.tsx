import { fireEvent, render, screen } from '@testing-library/react'

import { CLUB_TAB, ClubTabView } from '../ClubTabView'

describe('<ClubTabView/>', () => {
    it ('should test on click board tab', () => {
        const mockSetSelectedTab = jest.fn()
        render(<ClubTabView
            selectedTab={CLUB_TAB.BOARD}
            setSelectedTab={() => mockSetSelectedTab()}
        />)
        const text = screen.getByText('게시판')
        fireEvent.click(text)
        expect(mockSetSelectedTab).toHaveBeenCalledTimes(1)
    })

    it ('should test on click event tab', () => {
        const mockSetSelectedTab = jest.fn()
        render(<ClubTabView
            selectedTab={CLUB_TAB.BOARD}
            setSelectedTab={() => mockSetSelectedTab()}
        />)
        const text = screen.getByText('행사')
        fireEvent.click(text)
        expect(mockSetSelectedTab).toHaveBeenCalledTimes(1)
    })

    it ('should test on click tag tab', () => {
        const mockSetSelectedTab = jest.fn()
        render(<ClubTabView
            selectedTab={CLUB_TAB.BOARD}
            setSelectedTab={() => mockSetSelectedTab()}
        />)
        const text = screen.getByText('태그')
        fireEvent.click(text)
        expect(mockSetSelectedTab).toHaveBeenCalledTimes(1)
    })

    it ('should test on click info tab', () => {
        const mockSetSelectedTab = jest.fn()
        render(<ClubTabView
            selectedTab={CLUB_TAB.BOARD}
            setSelectedTab={() => mockSetSelectedTab()}
        />)
        const text = screen.getByText('정보')
        fireEvent.click(text)
        expect(mockSetSelectedTab).toHaveBeenCalledTimes(1)
    })
})

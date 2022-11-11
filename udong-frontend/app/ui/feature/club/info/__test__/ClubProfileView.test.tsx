import { fireEvent, render, screen } from '@testing-library/react'

import { ClubProfileView } from '../ClubProfileView'

describe('<ClubProfileView/>', () => {
    it('should test on click delete', () => {
        const mockOnDelete = jest.fn()
        render(<ClubProfileView onClickDelete={() => {mockOnDelete()}}/>)
        const text = screen.getByText('삭제하기')
        fireEvent.click(text)
        expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })

    it('should test on click leave', () => {
        render(<ClubProfileView onClickDelete={() => {return}}/>)
        const text = screen.getByText('탈퇴하기')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })
})

import { fireEvent, render, screen } from '@testing-library/react'

import { ClickableTag } from '../ClickableTag'

describe('<ClickableTag/>', () => {
    it ('render clickable tag & handle click', () => {
        const mockOnClick = jest.fn()
        render(<ClickableTag
            text={'TAG'}
            isIncluded={true}
            onClick={mockOnClick}
        />)
        const component = screen.getByText('TAG')
        fireEvent.click(component)
        expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
})

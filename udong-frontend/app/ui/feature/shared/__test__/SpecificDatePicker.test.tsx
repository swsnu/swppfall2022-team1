import { render, screen } from '@testing-library/react'

import { SpecificDatePicker } from '../SpecificDatePicker'

describe('<SpecificDatePicker/>', () => {
    it('renders picker', () => {
        render(<SpecificDatePicker
            date={'2000-01-01'}
            setDate={()=>{return}}
        />)
        const picker = screen.getByPlaceholderText('Date')
        expect(picker).toBeDefined()
    })
})

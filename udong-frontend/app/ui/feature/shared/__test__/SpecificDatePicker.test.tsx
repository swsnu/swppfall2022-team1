import { fireEvent, render, screen } from '@testing-library/react'

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
    it('change date', () => {
        let date = '2000-01-01'
        render(<SpecificDatePicker
            date={date}
            setDate={(newDate: string)=>{date = newDate}}
        />)
        const picker = screen.getByPlaceholderText('Date')
        fireEvent.click(picker)
        expect(date).toBe('2022-01-01')
    })
})

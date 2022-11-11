import { render, screen } from '@testing-library/react'

import { DateRangePicker } from '../DateRangePicker'

describe('<DateRangePicker/>', () => {
    it('renders picker', () => {
        render(<DateRangePicker
            date={{ start: '2022-01-01', end: '2023-01-01' }}
            setDate={()=>{return}}
        />)
        const picker = screen.getByPlaceholderText('Start')
        expect(picker).toBeDefined()
    })
})

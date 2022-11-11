import { render, screen } from '@testing-library/react'

import { SpecificTimePicker } from '../SpecificTimePicker'

describe('<SpecificTimePicker/>', () => {
    it('renders picker', () => {
        render(<SpecificTimePicker
            time={'00:00'}
            setTime={()=>{return}}
        />)
        const picker = screen.getByPlaceholderText('Time')
        expect(picker).toBeDefined()
    })
})

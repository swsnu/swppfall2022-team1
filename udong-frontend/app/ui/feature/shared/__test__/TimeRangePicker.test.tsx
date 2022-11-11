import { render, screen } from '@testing-library/react'

import { TimeRangePicker } from '../TimeRangePicker'

describe('<TimeRangePicker/>', () => {
    it('renders picker', () => {
        render(<TimeRangePicker
            time={{ start: '00:00', end: '23:30' }}
            setTime={()=>{return}}
        />)
        const picker = screen.getByPlaceholderText('Start')
        expect(picker).toBeDefined()
    })
})

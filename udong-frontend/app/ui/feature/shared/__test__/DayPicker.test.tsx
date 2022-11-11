import { fireEvent, render, screen } from '@testing-library/react'

import { DayPicker, DAYS } from '../DayPicker'

describe('<DayPicker/>', () => {
    it('renders day picker', () => {
        render(<DayPicker
            selectedDay={''}
            setSelectedDay={()=>{return}}
        />)
        const option = screen.getByText('요일을 선택하세요')
        expect(option).toBeDefined()
    })
    it('change option', () => {
        render(<DayPicker
            selectedDay={''}
            setSelectedDay={()=>{return}}
        />)
        const option = screen.getByText('화요일')
        fireEvent.click(option)
        const defaultOption = screen.getByText('요일을 선택하세요')
        expect(defaultOption).toBeDisabled()
    })
    it('render fixed day picker', () => {
        render(<DayPicker
            selectedDay={'월' as DAYS}
            setSelectedDay={()=>{return}}
            fixed={true}
        />)
        const option = screen.getByText('월요일')
        expect(option).toBeDefined()
    })
})

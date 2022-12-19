import { render, screen } from '@testing-library/react'

import { DAYS } from '../../../../shared/DayPicker'
import { EventDaySchedule } from '../EventDaySchedule'

describe('<EventDaySchedule/>', () =>{
    beforeEach(()=>jest.clearAllMocks())
    it('render page', () => {
        render(<EventDaySchedule
            weekdayRange={{ start: '2022-01-01', end: '2022-12-01' }}
            setWeekdayRange={()=>{return}}
            weekdayTimesWithId={[{ id: 1, day: DAYS.SUNDAY, time: { start: '10:00', end: '23:30' } }]}
            setWeekdayTimesWithId={()=>{return}}
        />)
        const dayText = screen.getByText('요일')
        expect(dayText).toBeDefined()
    })
})

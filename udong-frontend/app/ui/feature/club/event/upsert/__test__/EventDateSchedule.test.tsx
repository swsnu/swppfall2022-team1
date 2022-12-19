import { render, screen } from '@testing-library/react'

import { EventDateSchedule } from '../EventDateSchedule'

describe('<EventDateSchedule/>', () =>{
    beforeEach(()=>jest.clearAllMocks())
    it('render page', () => {
        render(<EventDateSchedule
            dayTimesWithId={[{ id: 1, start: { date: '2022-12-24', time: '00:30' }, end: { date: '2022-12-25', time: '12:30' } }]}
            setDayTimesWithId={()=>{return}}
        />)
        const dayText = screen.getByText('기간')
        expect(dayText).toBeDefined()
    })
})

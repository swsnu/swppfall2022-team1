import { render, screen } from '@testing-library/react'

import { EventCalendar } from '../calendar/EventCalendar'

describe('<EventCalendar/>', function () {
    beforeEach(()=>jest.clearAllMocks())
    it ('render event calendar', () => {
        render(<EventCalendar
            events={[]}
            onClickEvent={() => {
                return
            }}
        />)
        const todayButton = screen.getByText('Today')
        expect(todayButton).toBeDefined()

    })

})

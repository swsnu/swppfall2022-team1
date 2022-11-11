import { render, screen } from '@testing-library/react'

import EventEditPage from '../edit'

jest.mock('../../../../../../app/ui/feature/club/event/upsert/edit/EventEditContainer', () => ({
    EventEditContainer: () => <div data-testid={'event-edit-container'}/>,
}))

test('renders event create page', async () => {
    render(<EventEditPage/>)
    const lbl = screen.findByTestId('event-create-container')
    expect(lbl).toBeDefined()
})

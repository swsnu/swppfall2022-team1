import { render, screen } from '@testing-library/react'

import EventEditPage from '../edit'

jest.mock('../../../../../../app/ui/feature/club/event/upsert/edit/EventEditContainer', () => ({
    EventEditContainer: () => <div data-testid={'event-edit-container'}/>,
}))

test('renders event create page', () => {
    render(<EventEditPage/>)
    const container = screen.getByTestId('event-edit-container')
    expect(container).toBeDefined()
})

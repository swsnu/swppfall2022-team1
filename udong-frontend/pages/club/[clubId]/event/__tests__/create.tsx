import { render, screen } from '@testing-library/react'

import EventCreatePage from '../create'

jest.mock( '../../../../../app/ui/feature/club/event/upsert/create/EventCreateContainer', () => ({
    EventCreateContainer: () => <div data-testid={'event-create-container'}/>,
}))

test('renders event create page', async () => {
    render(<EventCreatePage/>)
    const lbl = screen.findByTestId('event-create-container')
    expect(lbl).toBeDefined()
})

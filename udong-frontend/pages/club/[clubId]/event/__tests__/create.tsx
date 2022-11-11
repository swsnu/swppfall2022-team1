import { render, screen } from '@testing-library/react'

import EventCreatePage from '../create'

jest.mock( '../../../../../app/ui/feature/club/event/upsert/create/EventCreateContainer', () => ({
    EventCreateContainer: () => <div data-testid={'event-create-container'}/>,
}))

test('renders event create page', () => {
    render(<EventCreatePage/>)
    const container = screen.getByTestId('event-create-container')
    expect(container).toBeDefined()
})

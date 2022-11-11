import { render, screen } from '@testing-library/react'

import { EventCreateContainer } from '../EventCreateContainer'

jest.mock('../../../../../../components/UdongHeader', () => ({
    UdongHeader: () => <div data-testid={'udong-header'}/>,
}))

jest.mock('../../../../../../components/UdongButton', () => ({
    UdongButton: () => <div data-testid={'udong-button'}/>,
}))

jest.mock('../../EventInputView', () => ({
    EventInputView: () => <div data-testid={'event-input-view'}/>,
}))

jest.mock('../../EventAdditionalFieldsView', () => ({
    EventAdditionalFieldsView: () => <div data-testid={'event-additional-fields-view'}/>,
}))

test('renders event create container',  () => {
    render(<EventCreateContainer/>)
    const header = screen.getByTestId('udong-header')
    const inputView = screen.getByTestId('event-input-view')
    const additionalFieldsView = screen.getByTestId('event-additional-fields-view')
    expect(header).toBeDefined()
    expect(inputView).toBeDefined()
    expect(additionalFieldsView).toBeDefined()
})

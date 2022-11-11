import { render, screen } from '@testing-library/react'

import { EventCreateContainer } from '../EventCreateContainer'

jest.mock('../../../../../../components/UdongHeader', () => ({
    UdongHeader: () => <div data-testid={'udong-header'}/>,
}))

jest.mock('../../../../../../components/UdongButton', () => ({
    UdongButton: () => <div data-testid={'udong-button'}/>,
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
    const header = screen.findByTestId('udong-header')
    const button = screen.findByTestId('udong-button')
    const inputView = screen.findByTestId('event-input-view')
    const additionalFieldsView = screen.findByTestId('event-additional-fields-view')
    expect(header).toBeDefined()
    expect(button).toBeDefined()
    expect(inputView).toBeDefined()
    expect(additionalFieldsView).toBeDefined()
})

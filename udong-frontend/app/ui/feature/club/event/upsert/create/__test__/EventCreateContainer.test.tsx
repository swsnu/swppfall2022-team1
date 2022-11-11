import { fireEvent, render, screen } from '@testing-library/react'

import { EventCreateContainer } from '../EventCreateContainer'

jest.mock('../../EventInputView', () => ({
    EventInputView: () => <div data-testid={'event-input-view'}/>,
}))

jest.mock('../../EventAdditionalFieldsView', () => ({
    EventAdditionalFieldsView: () => <div data-testid={'event-additional-fields-view'}/>,
}))

describe('<EventCreateContainer/>', () => {
    it('renders event create container',  () => {
        render(<EventCreateContainer/>)
        const inputView = screen.getByTestId('event-input-view')
        const additionalFieldsView = screen.getByTestId('event-additional-fields-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })
    it('button click test', () => {
        render(<EventCreateContainer/>)
        const saveButton = screen.getByRole('button')
        fireEvent.click(saveButton)
        // further implementation required after save api connect
    })
})

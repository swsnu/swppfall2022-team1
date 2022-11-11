import { fireEvent, render, screen } from '@testing-library/react'

import { EventEditContainer } from '../EventEditContainer'

jest.mock('../../EventInputView', () => ({
    EventInputView: () => <div data-testid={'event-input-view'}/>,
}))

jest.mock('../../EventAdditionalFieldsView', () => ({
    EventAdditionalFieldsView: () => <div data-testid={'event-additional-fields-view'}/>,
}))

describe('<EventEditContainer/>', () => {
    it('renders event edit container',  () => {
        render(<EventEditContainer/>)
        const inputView = screen.getByTestId('event-input-view')
        const additionalFieldsView = screen.getByTestId('event-additional-fields-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })

    it('button click test', () => {
        render(<EventEditContainer/>)
        const saveButton = screen.getByRole('button')
        fireEvent.click(saveButton)
        // further implementation required after save api connect
    })
})

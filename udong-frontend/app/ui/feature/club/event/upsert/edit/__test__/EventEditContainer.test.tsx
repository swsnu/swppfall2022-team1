import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { mockStore } from '../../../__test__/EventContainer.test'
import { EventCreateContainer } from '../../create/EventCreateContainer'

jest.mock('../../EventInputView', () => ({
    EventInputView: () => <div data-testid={'event-input-view'}/>,
}))

jest.mock('../../EventAdditionalFieldsView', () => ({
    EventAdditionalFieldsView: () => <div data-testid={'event-additional-fields-view'}/>,
}))

describe('<EventEditContainer/>', () => {
    const eventEditContainer: JSX.Element = (
        <Provider store={mockStore}>
            <EventCreateContainer/>
        </Provider>
    )

    it('renders event edit container',  () => {
        render(eventEditContainer)
        const inputView = screen.getByTestId('event-input-view')
        const additionalFieldsView = screen.getByTestId('event-additional-fields-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })

    it('button click test', () => {
        render(eventEditContainer)
        const saveButton = screen.getByRole('button')
        fireEvent.click(saveButton)
    })
})

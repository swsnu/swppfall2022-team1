import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { mockStore } from '../../../__test__/EventContainer.test'
import { EventCreateContainer } from '../EventCreateContainer'

jest.mock('../../EventInputView', () => ({
    EventInputView: () => <div data-testid={'event-input-view'}/>,
}))

jest.mock('../../EventAdditionalFieldsView', () => ({
    EventAdditionalFieldsView: () => <div data-testid={'event-additional-fields-view'}/>,
}))

describe('<EventCreateContainer/>', () => {
    const eventCreateContainer: JSX.Element = (
        <Provider store={mockStore}>
            <EventCreateContainer/>
        </Provider>
    )

    beforeEach(()=>jest.clearAllMocks())
    it('renders event create container',  () => {
        render(eventCreateContainer)
        const inputView = screen.getByTestId('event-input-view')
        const additionalFieldsView = screen.getByTestId('event-additional-fields-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })
    it('button click test', () => {
        render(eventCreateContainer)
        const saveButton = screen.getByRole('button')
        fireEvent.click(saveButton)
        // further implementation required after save api connect
    })
})

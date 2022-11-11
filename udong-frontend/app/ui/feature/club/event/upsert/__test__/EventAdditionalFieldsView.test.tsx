import { fireEvent, render, screen } from '@testing-library/react'

import { EventAdditionalFieldsView } from '../EventAdditionalFieldsView'

jest.mock( '../../../../../components/UdongRadioButton', () => ({
    UdongRadioButton: ({ text, onCheck }: { text: string, onCheck: () => void }) =>
        <div
            data-testid={'udong-radio-button'}
            onClick={onCheck}
        >{text}</div>,
}))

jest.mock('../EventDaySchedule', () => ({
    EventDaySchedule: ({ isEdit }: { isEdit: boolean }) =>
        <div data-testid={'event-day-schedule'}>{isEdit ? 'is edit' : 'not is edit'}</div>,
}))

jest.mock('../EventDateSchedule', () => ({
    EventDateSchedule: ({ isEdit }: { isEdit: boolean }) =>
        <div data-testid={'event-date-schedule'}>{isEdit ? 'is edit' : 'not is edit'}</div>,
}))

jest.mock('../../../../../components/UdongText', () => ({
    UdongText: () => <div data-testid={'udong-text'}/>,
}))

describe('<EventAdditionalFieldsView/>',   () => {
    beforeEach(() => {jest.clearAllMocks()})
    it ('renders default component', () => {
        render(<EventAdditionalFieldsView isEdit={false}/>)
        const text = screen.getByTestId('udong-text')
        expect(text).toBeDefined()
        const dayContainer = screen.getByTestId('event-day-schedule')
        expect(dayContainer).toBeDefined()
    })
    it ('when isEdit true', () => {
        render(<EventAdditionalFieldsView isEdit={true}/>)
        const container = screen.getByText('is edit')
        expect(container).toBeDefined()
    })
    it ('when isEdit false', () => {
        render(<EventAdditionalFieldsView isEdit={false}/>)
        const container = screen.getByText('not is edit')
        expect(container).toBeDefined()
    })
    it ('radio button change to dates', () => {
        render(<EventAdditionalFieldsView isEdit={false}/>)
        const radioButton = screen.getByText('날짜')
        fireEvent.click(radioButton)
        const dateContainer = screen.getByTestId('event-date-schedule')
        expect(dateContainer).toBeDefined()
    })
    it ('radio button change to not assigned', async () => {
        render(<EventAdditionalFieldsView isEdit={false}/>)
        const radioButton = screen.getByText('지정안함')
        fireEvent.click(radioButton)
        const dayContainer = screen.queryByTestId('event-day-schedule')
        const dateContainer = screen.queryByTestId('event-date-schedule')
        expect(dayContainer).toBeNull()
        expect(dateContainer).toBeNull()
    })
})

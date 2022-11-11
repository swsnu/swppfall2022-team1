import { fireEvent, render, screen } from '@testing-library/react'

import { EventDateSchedule } from '../EventDateSchedule'

jest.mock('../../../../../components/UdongImage', () => (
    {
        UdongImage: ({ onClick }: { onClick: () => void }) => <button
            data-testid={'udong-image'}
            onClick={onClick}
        />,
    }
))

jest.mock('../../../../shared/SpecificDatePicker', () => ({
    SpecificDatePicker: ({ date, setDate, fixed }:
                    { date: string, setDate: (date: string) => void, fixed?: boolean }) =>
        <div
            data-testid={'date-picker'}
            onClick={()=>{if (!fixed) {setDate('2000-01-01')}}}
        >{date}</div>,
}))

jest.mock('../../../../shared/SpecificTimePicker', () => ({
    SpecificTimePicker: ({ time, setTime, fixed }:
                    { time: string, setTime: (times: string) => void, fixed?: boolean }) =>
        <div
            data-testid={'time-picker'}
            onClick={()=>{if (!fixed) {setTime('00:00')}}}
        >{time}</div>,
}))

jest.mock('../../../../../components/UdongText', () => ({
    UdongText: () => <div data-testid={'udong-text'}/>,
}))

describe('<EventDateSchedule/>',  () => {
    beforeEach(()=>jest.clearAllMocks())
    it('renders event date schedule', () => {
        render(<EventDateSchedule isEdit={true}/>)
        const text = screen.getAllByTestId('udong-text')
        expect(text).toBeDefined()
    })
    it('change selected date', () => {
        render(<EventDateSchedule isEdit={false}/>)
        const datePicker = screen.getAllByTestId('date-picker')
        fireEvent.click(datePicker[0])
        fireEvent.click(datePicker[1])
        const newPicker = screen.getAllByText('2000-01-01')
        expect(newPicker).toHaveLength(2)
    })
    it('change selected time', () => {
        render(<EventDateSchedule isEdit={false}/>)
        const timePicker = screen.getAllByTestId('time-picker')
        fireEvent.click(timePicker[0])
        fireEvent.click(timePicker[1])
        const newPicker = screen.getAllByText('00:00')
        expect(newPicker).toHaveLength(2)
    })
    it('add and remove pickers', async () => {
        render(<EventDateSchedule isEdit={false}/>)
        const prevPickerList = screen.getAllByTestId('date-picker')
        const imageButtons = screen.getAllByTestId('udong-image')

        // add
        fireEvent.click(imageButtons[imageButtons.length - 1])
        const currPickerList = screen.getAllByTestId('date-picker')
        expect(currPickerList.length - prevPickerList.length).toBe(2)

        // remove
        const nextImageButtons = screen.getAllByTestId('udong-image')
        fireEvent.click(nextImageButtons[0])
        const nextPickerList = screen.getAllByTestId('date-picker')
        expect(currPickerList.length - nextPickerList.length).toBe(2)
    })
})

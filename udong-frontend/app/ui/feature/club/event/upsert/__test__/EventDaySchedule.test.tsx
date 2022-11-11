import { fireEvent, render, screen } from '@testing-library/react'

import { DAYS } from '../../../../shared/DayPicker'
import { TimeRangeType } from '../../../../shared/TimeRangePicker'
import { EventDaySchedule } from '../EventDaySchedule'

jest.mock('../../../../../components/UdongImage', () => (
    {
        UdongImage: ({ onClick }: { onClick: () => void }) => <button
            data-testid={'udong-image'}
            onClick={onClick}
        />,
    }
))

jest.mock('../../../../shared/DayPicker', () => ({
    DayPicker: ({ selectedDay, setSelectedDay, fixed }:
                    { selectedDay: DAYS | '', setSelectedDay: (day: DAYS|'') => void, fixed?: boolean }) =>
        <div
            data-testid={'day-picker'}
            onClick={()=>{if (!fixed) {setSelectedDay('일' as DAYS)}}}
        >{selectedDay}</div>,
}))

jest.mock('../../../../shared/TimeRangePicker', () => ({
    TimeRangePicker: ({ time, setTime, fixed }:
                    { time: TimeRangeType, setTime: (times: TimeRangeType) => void, fixed?: boolean }) =>
        <div
            data-testid={'time-range-picker'}
            onClick={()=>{if (!fixed) {setTime({ start: '00:00', end: '23:30' })}}}
        ><p>{time.start}</p><p>{time.end}</p></div>,
}))

jest.mock('../../../../../components/UdongText', () => ({
    UdongText: () => <div data-testid={'udong-text'}/>,
}))

describe('<EventDaySchedule/>',  () => {
    beforeEach(()=>jest.clearAllMocks())
    it('renders event day schedule', () => {
        render(<EventDaySchedule isEdit={true}/>)
        const text = screen.getAllByTestId('udong-text')
        expect(text).toBeDefined()
    })
    it('change selected day', () => {
        render(<EventDaySchedule isEdit={false}/>)
        const dayPicker = screen.getByTestId('day-picker')
        fireEvent.click(dayPicker)
        const newPicker = screen.getByText('일')
        expect(newPicker).toBeDefined()
    })
    it('change selected time range', () => {
        render(<EventDaySchedule isEdit={false}/>)
        const timeRangePicker = screen.getByTestId('time-range-picker')
        fireEvent.click(timeRangePicker)
        const newPicker = screen.getByText('00:00')
        expect(newPicker).toBeDefined()
    })
    it('add and remove pickers', async () => {
        render(<EventDaySchedule isEdit={false}/>)
        const prevPickerList = screen.getAllByTestId('day-picker')
        const imageButtons = screen.getAllByTestId('udong-image')

        // add
        fireEvent.click(imageButtons[imageButtons.length - 1])
        const currPickerList = screen.getAllByTestId('day-picker')
        expect(currPickerList.length - prevPickerList.length).toBe(1)

        // remove
        const nextImageButtons = screen.getAllByTestId('udong-image')
        fireEvent.click(nextImageButtons[0])
        const nextPickerList = screen.getAllByTestId('day-picker')
        expect(currPickerList.length - nextPickerList.length).toBe(1)
    })
})

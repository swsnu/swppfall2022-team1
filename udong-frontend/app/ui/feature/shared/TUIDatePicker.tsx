import 'tui-date-picker/dist/tui-date-picker.css'
import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import DatePicker from 'tui-date-picker'

import { VStack } from '../../components/Stack'

interface TUIDatePickerProps {
    date: Date
    setDate: (date: Date) => void
}

const TUIDatePicker = ({ date, setDate } : TUIDatePickerProps) => {
    const dateInput = useRef<HTMLInputElement>(null)
    const calendarWrapper = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (calendarWrapper.current && dateInput.current){
            new DatePicker(calendarWrapper.current, {
                date: date,
                input: {
                    element: dateInput.current,
                    format: 'yyyy-MM-dd',
                },
            })
        }
    }, [])

    return <VStack>
        <div className={'tui-datepicker-input tui-datetime-input tui-has-focus'}>
            <DateInput
                type='text'
                id='datepicker-input'
                aria-label='Date-Time'
                ref={dateInput}
                onChange={(e) => setDate(new Date(e.target.value))}
            />
            <span className={'tui-ico-date'}/>
        </div>
        <div
            ref={calendarWrapper}
            style={{ marginTop: -1 }}
        />
    </VStack>
}

export default TUIDatePicker

const DateInput = styled.input({
    height: 32,
    width: 180,
    padding: 10,
})

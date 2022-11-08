import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useMemo } from 'react'
import 'antd/dist/antd.css'

import { VStack } from '../../components/Stack'

interface DateRangePickerProps {
    setDate: (date: DateRangeType) => void
    date: DateRangeType
    fixed?: boolean
}

export type DateRangeType = {
    start: string
    end: string
}

const DateRangePicker = ({ setDate, date, fixed } : DateRangePickerProps) => {
    const { RangePicker } = useMemo(() => (
        DatePicker
    ), [])

    return <VStack width={320}>
        <RangePicker
            defaultValue={date.start.length ? [moment(date.start, 'YYYY-MM-DD'), moment(date.end, 'YYYY-MM-DD')] : undefined}
            disabled={!!fixed}
            format={'YYYY-MM-DD'}
            minuteStep={30}
            onChange={(range) => {
                if (range && range[0] !== null && range[1] !== null){
                    setDate({ start: range[0].format('YYYY-MM-DD'), end: range[1].format('YYYY-MM-DD') })
                }
            }}
            allowClear={false}
            placeholder={['Start', 'End']}
        />
    </VStack>
}

export default DateRangePicker

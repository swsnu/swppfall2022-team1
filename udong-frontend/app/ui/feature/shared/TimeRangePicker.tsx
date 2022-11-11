import { TimePicker } from 'antd'
import moment from 'moment'
import React, { useMemo } from 'react'
import 'antd/dist/antd.css'

import { VStack } from '../../components/Stack'

interface TimeRangePickerProps {
    setTime: (times: TimeRangeType) => void
    time: TimeRangeType
    fixed?: boolean
}

export interface TimeRangeType {
    start: string
    end: string
}

export const TimeRangePicker = ({ setTime, time, fixed } : TimeRangePickerProps) => {
    const { RangePicker } = useMemo(() => (
        TimePicker
    ), [])

    return <VStack width={160}>
        <RangePicker
            defaultValue={time.start.length ? [moment(time.start, 'HH:mm'), moment(time.end, 'HH:mm')] : undefined}
            disabled={!!fixed}
            format={'HH:mm'}
            minuteStep={30}
            onChange={(range) => {
                if (range && range[0] !== null && range[1] !== null){
                    setTime({ start: range[0].format('HH:mm'), end: range[1].format('HH:mm') })
                }
            }}
            allowClear={false}
            placeholder={['Start', 'End']}
        />
    </VStack>
}


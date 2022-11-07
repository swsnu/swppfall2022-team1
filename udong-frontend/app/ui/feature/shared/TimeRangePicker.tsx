import { TimePicker } from 'antd'
import moment from 'moment'
import React, { useMemo } from 'react'
import 'antd/dist/antd.css'

import { VStack } from '../../components/Stack'

interface TimeRangePickerProps {
    setTime: (times: string[]) => void
    fixedTime?: string[]
}

const TimeRangePicker = ({ setTime, fixedTime } : TimeRangePickerProps) => {
    const { RangePicker } = useMemo(() => (
        TimePicker
    ), [])

    return <VStack width={160}>
        <RangePicker
            defaultValue={fixedTime ? [moment(fixedTime[0], 'HH:mm'), moment(fixedTime[1], 'HH:mm')] : undefined}
            disabled={!!fixedTime}
            format={'HH:mm'}
            minuteStep={30}
            onChange={(range) => {
                if (range && range[0] !== null && range[1] !== null){
                    setTime([range[0].format('HH:mm'), range[1].format('HH:mm')])
                }
            }}
            allowClear={false}
            placeholder={['Start', 'End']}
        />
    </VStack>
}

export default TimeRangePicker

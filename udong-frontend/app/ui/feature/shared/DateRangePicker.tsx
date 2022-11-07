import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useMemo } from 'react'
import 'antd/dist/antd.css'

import { VStack } from '../../components/Stack'

interface DateRangePickerProps {
    setDate: (dates: string[]) => void
    fixedDate?: string[]
}

const DateRangePicker = ({ setDate, fixedDate } : DateRangePickerProps) => {
    const { RangePicker } = useMemo(() => (
        DatePicker
    ), [])

    return <VStack width={320}>
        <RangePicker
            defaultValue={fixedDate ? [moment(fixedDate[0], 'YYYY-MM-DD'), moment(fixedDate[1], 'YYYY-MM-DD')] : undefined}
            disabled={!!fixedDate}
            format={'YYYY-MM-DD'}
            minuteStep={30}
            onChange={(range) => {
                if (range && range[0] !== null && range[1] !== null){
                    setDate([range[0].format('YYYY-MM-DD'), range[1].format('YYYY-MM-DD')])
                }
            }}
            allowClear={false}
            placeholder={['Start', 'End']}
        />
    </VStack>
}

export default DateRangePicker

import { DatePicker } from 'antd'
import moment from 'moment'
import React from 'react'
import 'antd/dist/antd.css'

import { VStack } from '../../components/Stack'

interface SpecificDatePickerProps {
    setDate: (date: string) => void
    date: string
    fixed?: boolean
}

export const SpecificDatePicker = ({ setDate, date, fixed } : SpecificDatePickerProps) => {
    return <VStack width={180}>
        <DatePicker
            defaultValue={date.length ? moment(date, 'YYYY-MM-DD') : undefined}
            disabled={!!fixed}
            format={'YYYY-MM-DD'}
            minuteStep={30}
            onChange={(date) => {
                if (date){
                    setDate(date.format('YYYY-MM-DD'))
                }
            }}
            allowClear={false}
            placeholder={'Date'}
        />
    </VStack>
}

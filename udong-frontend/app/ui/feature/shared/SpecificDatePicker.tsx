import { DatePicker } from 'antd'
import moment from 'moment'
import React from 'react'
import 'antd/dist/antd.css'

import { VStack } from '../../components/Stack'

interface SpecificDatePickerProps {
    setDate: (date: string) => void
    fixedDate?: string
}

const SpecificDatePicker = ({ setDate, fixedDate } : SpecificDatePickerProps) => {
    return <VStack width={180}>
        <DatePicker
            defaultValue={fixedDate ? moment(fixedDate, 'YYYY-MM-DD') : undefined}
            disabled={!!fixedDate}
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

export default SpecificDatePicker

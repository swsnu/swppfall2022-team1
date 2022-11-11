import { TimePicker } from 'antd'
import moment from 'moment'
import React from 'react'
import 'antd/dist/antd.css'

import { VStack } from '../../components/Stack'

interface SpecificTimePickerProps {
    setTime: (time: string) => void
    time: string
    fixed?: boolean
}

export const SpecificTimePicker = ({ setTime, time, fixed } : SpecificTimePickerProps) => {

    return <VStack width={110}>
        <TimePicker
            defaultValue={time.length ? moment(time, 'HH:mm') : undefined}
            disabled={!!fixed}
            format={'HH:mm'}
            minuteStep={30}
            onChange={(time) => {
                if (time){
                    setTime(time.format('HH:mm'))
                }
            }}
            allowClear={false}
            placeholder={'Time'}
        />
    </VStack>
}


import { TimePicker } from 'antd'
import moment from 'moment'
import React from 'react'
import 'antd/dist/antd.css'

import { VStack } from '../../components/Stack'

interface SpecificTimePickerProps {
    setTime: (time: string) => void
    fixedTime?: string
}

const SpecificTimePicker = ({ setTime, fixedTime } : SpecificTimePickerProps) => {

    return <VStack width={110}>
        <TimePicker
            defaultValue={fixedTime ? moment(fixedTime, 'HH:mm') : undefined}
            disabled={!!fixedTime}
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

export default SpecificTimePicker

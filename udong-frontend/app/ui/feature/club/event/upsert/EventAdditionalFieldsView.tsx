import React, { useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongRadioButton } from '../../../../components/UdongRadioButton'
import { UdongText } from '../../../../components/UdongText'
import EventDateSchedule from './EventDateSchedule'
import EventDaySchedule from './EventDaySchedule'

type SchedulingTimeType = 'days' | 'dates' | 'notAssigned'

export const EventAdditionalFieldsView = () => {
    const [schedulingTimeType, setSchedulingTimeType] = useState<SchedulingTimeType>('days')

    return <VStack>
        <HStack
            alignItems={'center'}
            justifyContent={'start'}
            paddingVertical={12}
        >
            <UdongText style={'GeneralTitle'}>행사 시간</UdongText>
            <Spacer width={30}/>
            <UdongRadioButton
                text={'요일'}
                checked={schedulingTimeType === 'days'}
                onCheck={() => setSchedulingTimeType('days')}
            />
            <UdongRadioButton
                text={'날짜'}
                checked={schedulingTimeType === 'dates'}
                onCheck={() => setSchedulingTimeType('dates')}
            />
            <UdongRadioButton
                text={'지정안함'}
                checked={schedulingTimeType === 'notAssigned'}
                onCheck={() => setSchedulingTimeType('notAssigned')}
            />
        </HStack>
        <Spacer height={30}/>
        {
            schedulingTimeType === 'days' ? <EventDaySchedule />
                : schedulingTimeType === 'dates' ? <EventDateSchedule /> : null
        }
        <Spacer height={20}/>
    </VStack>
}

import React, { useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongRadioButton } from '../../../../components/UdongRadioButton'
import { UdongText } from '../../../../components/UdongText'
import EventDateSchedule from './EventDateSchedule'
import EventDaySchedule from './EventDaySchedule'

type SchedulingTimeType = 'days' | 'dates' | 'notAssigned'

interface EventAdditionalFieldsViewProps {
    isEdit: boolean
}

export const EventAdditionalFieldsView = ({ isEdit }: EventAdditionalFieldsViewProps) => {
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
            <Spacer width={30}/>
            <UdongRadioButton
                text={'날짜'}
                checked={schedulingTimeType === 'dates'}
                onCheck={() => setSchedulingTimeType('dates')}
            />
            <Spacer width={30}/>
            <UdongRadioButton
                text={'지정안함'}
                checked={schedulingTimeType === 'notAssigned'}
                onCheck={() => setSchedulingTimeType('notAssigned')}
            />
        </HStack>
        <Spacer height={30}/>
        {
            schedulingTimeType === 'days' ? <EventDaySchedule isEdit={isEdit} />
                : schedulingTimeType === 'dates' ? <EventDateSchedule isEdit={isEdit} /> : null
        }
        <Spacer height={20}/>
    </VStack>
}

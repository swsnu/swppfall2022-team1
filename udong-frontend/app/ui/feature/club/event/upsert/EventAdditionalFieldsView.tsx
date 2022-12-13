import React, { Dispatch, SetStateAction } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongRadioButton } from '../../../../components/UdongRadioButton'
import { UdongText } from '../../../../components/UdongText'
import { EventTimeType } from './create/EventCreateContainer'
import { dayTimeWithIdType, EventDateSchedule } from './EventDateSchedule'
import { EventDaySchedule } from './EventDaySchedule'

interface EventAdditionalFieldsViewProps {
    eventTimeType: EventTimeType
    setEventTimeType: Dispatch<SetStateAction<EventTimeType>>
    dayTimesWithId: Array<dayTimeWithIdType>
    setdayTimesWithId: Dispatch<SetStateAction<Array<dayTimeWithIdType>>>
}

export const EventAdditionalFieldsView = ({ eventTimeType, setEventTimeType, dayTimes, setDayTimes, dayTimesWithId, setdayTimesWithId }: EventAdditionalFieldsViewProps) => {
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
                checked={eventTimeType === 'days'}
                onCheck={() => setEventTimeType('days')}
            />
            <Spacer width={30}/>
            <UdongRadioButton
                text={'날짜'}
                checked={eventTimeType === 'dates'}
                onCheck={() => setEventTimeType('dates')}
            />
            <Spacer width={30}/>
            <UdongRadioButton
                text={'지정안함'}
                checked={eventTimeType === 'notAssigned'}
                onCheck={() => setEventTimeType('notAssigned')}
            />
        </HStack>
        <Spacer height={30}/>
        {
            eventTimeType === 'days' ?
                <EventDaySchedule
                    dayTimes={dayTimes}
                    setDayTimes={setDayTimes}
                />
                : eventTimeType === 'dates' ?
                    <EventDateSchedule
                        dayTimesWithId={dayTimesWithId}
                        setdayTimesWithId={setdayTimesWithId}
                    /> : null
        }
        <Spacer height={20}/>
    </VStack>
}

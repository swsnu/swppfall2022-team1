import React, { Dispatch, SetStateAction } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongRadioButton } from '../../../../components/UdongRadioButton'
import { UdongText } from '../../../../components/UdongText'
import { DateRangeType } from '../../../shared/DateRangePicker'
import { EventTimeType } from './create/EventCreateContainer'
import { DayTimeWithIdType, EventDateSchedule } from './EventDateSchedule'
import { EventDaySchedule, WeekdayTimeWithIdType } from './EventDaySchedule'

interface EventAdditionalFieldsViewProps {
    eventTimeType: EventTimeType
    setEventTimeType: Dispatch<SetStateAction<EventTimeType>>
    weekdayRange: DateRangeType
    setWeekdayRange: Dispatch<SetStateAction<DateRangeType>>
    weekdayTimesWithId: Array<WeekdayTimeWithIdType>
    setWeekdayTimesWithId: Dispatch<SetStateAction<Array<WeekdayTimeWithIdType>>>
    dayTimesWithId: Array<DayTimeWithIdType>
    setDayTimesWithId: Dispatch<SetStateAction<Array<DayTimeWithIdType>>>
}

export const EventAdditionalFieldsView = ({
    eventTimeType,
    setEventTimeType,
    weekdayRange,
    setWeekdayRange,
    weekdayTimesWithId,
    setWeekdayTimesWithId,
    dayTimesWithId,
    setDayTimesWithId }: EventAdditionalFieldsViewProps) => {
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
                    weekdayRange={weekdayRange}
                    setWeekdayRange={setWeekdayRange}
                    weekdayTimesWithId={weekdayTimesWithId}
                    setWeekdayTimesWithId={setWeekdayTimesWithId}
                />
                : eventTimeType === 'dates' ?
                    <EventDateSchedule
                        dayTimesWithId={dayTimesWithId}
                        setDayTimesWithId={setDayTimesWithId}
                    /> : null
        }
        <Spacer height={20}/>
    </VStack>
}

import { useRouter } from 'next/router'
import React from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongColors } from '../../../../theme/ColorPalette'
import { EventType } from '../EventContainer'
import { EventCalendar } from './EventCalendar'
import { UnsettledEventList } from './UnsettledEventList'

interface EventCalendarViewProps {
    events: EventType[]
}

export const EventCalendarView = ({ events }: EventCalendarViewProps) => {
    const router = useRouter()
    const { clubId } = router.query

    const onClickEvent = (eventId: string) => {
        router.push(`/club/${clubId}/event/${eventId}`)
    }

    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <HStack
            width={'100%'}
            style={{
                maxHeight: 'calc(100vh - 130px)',
                minWidth: '810px',
            }}
            justifyContent={'space-between'}
            gap={50}
        >
            <EventCalendar
                events={events.filter((event) => event.times.length > 0)}
                onClickEvent={onClickEvent}
            />
            <UnsettledEventList
                events={events.filter((event) => event.times.length == 0)}
                onClickEvent={onClickEvent}
            />
        </HStack>
    </VStack>
}

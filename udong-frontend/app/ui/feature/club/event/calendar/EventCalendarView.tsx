import { useRouter } from 'next/router'
import React from 'react'

import { ClubEvent } from '../../../../../domain/model/ClubEvent'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongColors } from '../../../../theme/ColorPalette'
import { EventCalendar } from './EventCalendar'
import { UnsettledEventList } from './UnsettledEventList'

interface EventCalendarViewProps {
    events: Array<ClubEvent>
}

export const EventCalendarView = ({ events }: EventCalendarViewProps) => {
    const router = useRouter()
    const { clubId } = router.query

    const onClickEvent = (eventId: number) => {
        router.push(`/club/${clubId}/event/${eventId}`)
    }

    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <HStack
            height={'600px'}
            style={{
                minWidth: '600px',
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

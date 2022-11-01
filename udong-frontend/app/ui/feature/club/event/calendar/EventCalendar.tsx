import { EventObject } from '@toast-ui/calendar/types/types/events'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongColors } from '../../../../theme/ColorPalette'

const Calendar = dynamic(() => import('./TUICalendar').then((mod)=>mod.Calender), { ssr: false, loading: () => <>loading...</> } )

const dummyEvents = [
    {
        id: '1',
        title: 'event1',
        start: '2022-11-01T10:00:00',
        end: '2022-11-03T11:00:00',
    },
    {
        id: '2',
        title: 'event2',
        start: '2022-11-01T10:00:00',
        end: '2022-11-03T11:00:00',
    },
    {
        id: '3',
        title: 'event3',
        start: '2022-11-01T10:00:00',
        end: '2022-11-03T11:00:00',
    },
]

export const EventCalendar = () => {
    const [events, setEvents] = useState<EventObject[]>([])

    useEffect(() => {
        setEvents(dummyEvents)
    }, [])

    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <Calendar events={events}/>
    </VStack>
}

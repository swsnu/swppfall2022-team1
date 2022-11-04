import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

import EventCreatePage from '../../../../../pages/club/[clubId]/event/create'
import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { EventCalendar } from './calendar/EventCalendar'
import { EventCalendarView } from './calendar/EventCalendarView'
import { EVENT_TAB, EventTabView, EventTabType } from './EventTabView'
import { EventListView } from './list/EventListView'

export interface EventType {
    id:string
    title:string
    times: {
        start: string
        end: string
    }[]
}

const dummyEvents: EventType[] = [
    {
        id: '1',
        title: 'event1',
        times: [{
            start: '2022-11-01T10:00:00',
            end: '2022-11-03T11:00:00',
        }],
    },
    {
        id: '2',
        title: 'event2',
        times: [{
            start: '2022-11-01T10:00:00',
            end: '2022-11-03T11:00:00',
        }],
    },
    {
        id: '3',
        title: 'event3',
        times: [],
    },
    {
        id: '4',
        title: 'event4',
        times: [],
    },
    {
        id: '5',
        title: 'event5',
        times: [{
            start: '2022-11-01T10:00:00',
            end: '2022-11-03T11:00:00',
        }, {
            start: '2022-11-12T10:00:00',
            end: '2022-11-20T23:00:00',
        }],
    },
    {
        id: '6',
        title: 'event6',
        times: [],
    },
    {
        id: '7',
        title: 'event7',
        times: [{
            start: '2022-11-01T10:00:00',
            end: '2022-11-03T11:00:00',
        }],
    },
]

export const EventContainer = () => {
    const router = useRouter()
    const { isReady } = router
    const { view } = router.query

    const handleCurrentView = useCallback((selectedTab: EventTabType) => {
        router.replace(`/club/1/?tab=event&view=${selectedTab}`)
    }, [])

    const getCurrentTab = () => {
        if (view === EVENT_TAB.LIST){
            return <EventTabView
                selectedTab={EVENT_TAB.LIST}
                setSelectedTab={handleCurrentView}
            />
        } else {
            return <EventTabView
                selectedTab={EVENT_TAB.CALENDAR}
                setSelectedTab={handleCurrentView}
            />
        }
    }

    const getCurrentContainer = () => {
        if (view === EVENT_TAB.LIST){
            return <EventListView events={dummyEvents}/>
        } else {
            return <EventCalendarView events={dummyEvents}/>
        }
    }

    if (!isReady){
        return <p>Loading...</p>
    }

    return <VStack paddingHorizontal={16}>
        <Spacer height={70}/>
        {getCurrentTab()}
        <Spacer height={45}/>
        {getCurrentContainer()}
    </VStack>

}

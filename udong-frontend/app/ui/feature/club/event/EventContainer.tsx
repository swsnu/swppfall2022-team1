import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { eventSelector } from '../../../../domain/store/event/EventSelector'
import { eventActions } from '../../../../domain/store/event/EventSlice'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongLoader } from '../../../components/UdongLoader'
import { EventCalendarView } from './calendar/EventCalendarView'
import { EVENT_TAB, EventTabType, EventTabView } from './EventTabView'
import { EventListView } from './list/EventListView'

export interface EventType {
    id:string
    title:string
    created_at: Date
    updated_at: Date
    times: {
        start: Date
        end: Date
    }[]
}

export const dummyEvents: EventType[] = [
    {
        id: '1',
        title: 'event1',
        created_at: new Date('2021-01-23T22:23:22'),
        updated_at: new Date('2022-08-12T12:11:02'),
        times: [{
            start: new Date('2022-11-01T10:00:00'),
            end: new Date('2022-11-03T11:00:00'),
        }],
    },
    {
        id: '2',
        title: 'event2',
        created_at: new Date('2021-03-22T22:23:22'),
        updated_at: new Date('2022-09-15T12:11:02'),
        times: [{
            start: new Date('2022-11-01T10:00:00'),
            end: new Date('2022-11-03T11:00:00'),
        }],
    },
    {
        id: '3',
        title: 'event3',
        created_at: new Date('2022-03-28T22:23:22'),
        updated_at: new Date('2022-08-12T12:11:02'),
        times: [],
    },
    {
        id: '4',
        title: 'event4',
        created_at: new Date('2022-06-22T22:23:22'),
        updated_at: new Date('2022-08-12T12:11:02'),
        times: [],
    },
    {
        id: '5',
        title: 'event5',
        created_at: new Date('2022-09-22T22:23:22'),
        updated_at: new Date('2019-11-20T12:11:02'),
        times: [{
            start: new Date('2022-11-01T10:00:00'),
            end: new Date('2022-11-03T11:00:00'),
        }, {
            start: new Date('2022-11-12T10:00:00'),
            end: new Date('2022-11-20T23:00:00'),
        }],
    },
    {
        id: '6',
        title: 'event6',
        created_at: new Date('2022-10-22T22:23:22'),
        updated_at: new Date('2019-11-20T12:11:02'),
        times: [],
    },
    {
        id: '7',
        title: 'event7',
        created_at: new Date('2022-11-02T22:23:22'),
        updated_at: new Date('2019-11-20T12:11:02'),
        times: [{
            start: new Date('2022-11-01T10:00:00'),
            end: new Date('2022-11-03T11:00:00'),
        }],
    },
]

interface EventContainerProps {
    clubId: number
}

export const EventContainer = (props: EventContainerProps) => {
    const { clubId } = props
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { isReady } = router
    const { view } = router.query

    const events = useSelector(eventSelector.events)

    useEffect(() => {
        dispatch(eventActions.getEvents(clubId))
    }, [clubId, dispatch])

    const handleCurrentView = useCallback((selectedTab: EventTabType) => {
        router.replace(`/club/${clubId}/?tab=event&view=${selectedTab}`)
    }, [router])

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
            return <EventListView events={events}/>
        } else {
            return <EventCalendarView events={dummyEvents}/>
        }
    }

    if (!isReady){
        return <UdongLoader/>
    }

    return <VStack paddingHorizontal={16}>
        <HStack justifyContent={'end'}>
            <UdongButton
                style={'line'}
                onClick={() => router.push(`/club/${clubId}/event/create`)}
                width={120}
            >
                행사 만들기
            </UdongButton>
        </HStack>
        <Spacer height={20}/>
        {getCurrentTab()}
        <Spacer height={15}/>
        {getCurrentContainer()}
    </VStack>
}

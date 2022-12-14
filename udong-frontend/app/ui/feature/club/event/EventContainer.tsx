import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { eventSelector } from '../../../../domain/store/event/EventSelector'
import { eventActions } from '../../../../domain/store/event/EventSlice'
import { userSelector } from '../../../../domain/store/user/UserSelector'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongLoader } from '../../../components/UdongLoader'
import { EventCalendarView } from './calendar/EventCalendarView'
import { EVENT_TAB, EventTabType, EventTabView } from './EventTabView'
import { EventListView } from './list/EventListView'

interface EventContainerProps {
    clubId: number
}

export const EventContainer = (props: EventContainerProps) => {
    const { clubId } = props
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { isReady } = router
    const { view } = router.query
    const isAdmin = useSelector(userSelector.isAdmin)

    const events = useSelector(eventSelector.events)

    useEffect(() => {
        dispatch(eventActions.getEvents(clubId))
    }, [clubId, dispatch])

    const handleCurrentView = useCallback((selectedTab: EventTabType) => {
        router.replace(`/club/${clubId}/?tab=event&view=${selectedTab}`)
    }, [clubId, router])

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
            return <EventCalendarView events={events}/>
        }
    }

    if (!isReady){
        return <UdongLoader/>
    }

    return <VStack paddingHorizontal={16}>
        {isAdmin &&
        <HStack justifyContent={'end'}>
            <UdongButton
                style={'line'}
                onClick={() => router.push(`/club/${clubId}/event/create`)}
                width={120}
            >
                행사 만들기
            </UdongButton>
        </HStack>}
        <Spacer height={20}/>
        {getCurrentTab()}
        <Spacer height={15}/>
        {getCurrentContainer()}
    </VStack>
}

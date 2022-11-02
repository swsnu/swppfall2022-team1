import { useRouter } from 'next/router'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongColors } from '../../../../theme/ColorPalette'
import { EventCalendar } from './EventCalendar'
import UnsettledEventList from './UnsettledEventList'

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

export const EventCalendarView = () => {
    const router = useRouter()
    const { clubId } = router.query

    const onClickEvent = (eventId: string) => {
        router.push(`/club/${clubId}/event/${eventId}`)
    }

    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayDark}
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
                events={dummyEvents.filter((event) => event.times.length > 0)}
                onClickEvent={onClickEvent}
            />
            <UnsettledEventList
                events={dummyEvents.filter((event) => event.times.length == 0)}
                onClickEvent={onClickEvent}
            />
        </HStack>
    </VStack>
}

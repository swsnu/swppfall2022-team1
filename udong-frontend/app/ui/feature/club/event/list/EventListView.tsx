import { useRouter } from 'next/router'

import { HStack, VStack } from '../../../../components/Stack'
import { EventType } from '../EventContainer'
import { EventList } from './EventList'

interface EventListViewProps{
    events: EventType[]
}

export const EventListView = ({ events }: EventListViewProps) => {
    const router = useRouter()
    const { clubId } = router.query

    const onClickEvent = (eventId: string) => {
        router.push(`/club/${clubId}/event/${eventId}`)
    }

    return <VStack>
        <HStack
            width={'100%'}
            style={{
                maxHeight: 'calc(100vh - 130px)',
                minWidth: '810px',
            }}
            justifyContent={'space-between'}
            gap={50}
        >
            <EventList
                events={events.filter((event) => event.times.length > 0)}
                onClickEvent={onClickEvent}
            />
        </HStack>
    </VStack>
}

import { useRouter } from 'next/router'

import { ClubEvent } from '../../../../../domain/model/ClubEvent'
import { HStack, VStack } from '../../../../components/Stack'
import { ScrollToTopButton } from '../../../shared/ScrollToTopButton'
import { EventList } from './EventList'

interface EventListViewProps{
    events: Array<ClubEvent>
}

export const EventListView = ({ events }: EventListViewProps) => {
    const router = useRouter()
    const { clubId } = router.query

    const onClickEvent = (eventId: number) => {
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
                events={events.filter((event) => event.times !== undefined)}
                onClickEvent={onClickEvent}
            />
        </HStack>

        <ScrollToTopButton/>
    </VStack>
}

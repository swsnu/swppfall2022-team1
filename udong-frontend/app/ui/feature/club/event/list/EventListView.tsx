import { useRouter } from 'next/router'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongColors } from '../../../../theme/ColorPalette'
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
            <EventList
                events={events.filter((event) => event.times.length > 0)}
                onClickEvent={onClickEvent}
            />
        </HStack>
    </VStack>
}

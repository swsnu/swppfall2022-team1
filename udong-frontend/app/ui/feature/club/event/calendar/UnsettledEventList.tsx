import { VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { EventType } from '../EventContainer'
import UnsettledEvent from './UnsettledEvent'

interface UnsettledEventListProps {
    events: EventType[]
    onClickEvent: (eventId: string) => void
}

const UnsettledEventList = ({ events, onClickEvent }: UnsettledEventListProps) => {
    return <VStack
        paddingVertical={70}
        gap={10}
        style={{
            textAlign: 'center',
        }}
    >
        <UdongText style={'ListTitle'}>행사 시간 미정</UdongText>
        <VStack gap={5}>
            {events.map((event) => <UnsettledEvent
                key={event.id}
                title={event.title}
                onClick={()=>onClickEvent(event.id)}
            />)}
        </VStack>
    </VStack>
}

export default UnsettledEventList

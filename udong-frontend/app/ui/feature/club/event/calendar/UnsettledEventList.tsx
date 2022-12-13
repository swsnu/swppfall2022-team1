import { ClubEvent } from '../../../../../domain/model/ClubEvent'
import { VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import UnsettledEvent from './UnsettledEvent'

interface UnsettledEventListProps {
    events: Array<ClubEvent>
    onClickEvent: (eventId: string) => void
}

export const UnsettledEventList = ({ events, onClickEvent }: UnsettledEventListProps) => {
    return <VStack
        paddingVertical={70}
        gap={10}
        style={{
            textAlign: 'center',
        }}
    >
        <UdongText
            width={100}
            style={'ListTitle'}
        >행사 시간 미정</UdongText>
        <VStack gap={5}>
            {events.map((event) => <UnsettledEvent
                key={event.id}
                title={event.name}
                onClick={()=>onClickEvent(`${event.id}`)}
            />)}
        </VStack>
    </VStack>
}


import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { EventType } from '../EventContainer'

interface EventItemProps {
    event: EventType
    onClickEvent: (eventId: string) => void
}

export const EventItem = ({ event, onClickEvent }: EventItemProps) => {
    const dateToString = (date: Date) => {
        const m = date.getMonth() + 1
        const d = date.getDate()

        return [date.getFullYear(),
            (m > 9 ? '.' : '.0') + m,
            (d > 9 ? '.' : '.0') + d,
        ].join('')
    }

    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <VStack
            paddingVertical={12}
            paddingHorizontal={20}
            gap={12}
            onClick={()=>onClickEvent(event.id)}
        >
            <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <HStack>
                    <UdongText style={'ListContentS'}>
                        {event.title}
                    </UdongText>
                </HStack>
                <HStack>
                    <UdongText
                        style={'ListContentS'}
                    >
                        생성일: {dateToString(event.created_at)}
                    </UdongText>
                    <Spacer width={30}/>
                    <UdongText
                        style={'ListContentS'}
                    >
                        수정일: {dateToString(event.updated_at)}
                    </UdongText>
                </HStack>
            </HStack>
        </VStack>
    </VStack>
}

import { ClubEvent } from '../../../../../domain/model/ClubEvent'
import { DateTimeFormatter } from '../../../../../utility/dateTimeFormatter'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'

interface EventItemProps {
    event: ClubEvent
    onClickEvent: (eventId: number) => void
}

export const EventItem = ({ event, onClickEvent }: EventItemProps) => {
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
                        {event.name}
                    </UdongText>
                </HStack>
                <HStack>
                    <UdongText
                        style={'ListContentS'}
                    >
                        생성일: {DateTimeFormatter.formatDateTime(event.createdAt, false)}
                    </UdongText>
                    <Spacer width={30}/>
                    <UdongText
                        style={'ListContentS'}
                    >
                        수정일: {DateTimeFormatter.formatDateTime(event.updatedAt, false)}
                    </UdongText>
                </HStack>
            </HStack>
        </VStack>
    </VStack>
}

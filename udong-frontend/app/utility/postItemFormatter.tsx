import { Spacer } from '../ui/components/Spacer'
import { HStack } from '../ui/components/Stack'
import { UdongText } from '../ui/components/UdongText'

export const formatPostItemInfo = (
    clubName: string,
    isFeed: boolean,
    isClubBoard: boolean,
    isEventDetail: boolean,
    eventName?: string,
) => {

    if (isFeed) {
        return <HStack>
            <UdongText style={'ListContentUnderscore'}>{clubName}</UdongText>
            {eventName &&
                <HStack>
                    <UdongText
                        style={'ListContentS'}
                        margin={'0 4px'}
                    >
                        {'>'}
                    </UdongText>
                    <UdongText style={'ListContentUnderscore'}>{eventName}</UdongText>
                </HStack>
            }
            <Spacer width={30}/>
        </HStack>
    }

    if (isClubBoard) {
        if (!eventName) {
            return null
        }
        return <HStack>
            <UdongText style={'ListContentUnderscore'}>{eventName}</UdongText>
            <Spacer width={30}/>
        </HStack>
    }

    if (isEventDetail) {
        return null
    }
}

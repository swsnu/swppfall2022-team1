import { BoardPost, PostDisplayType } from '../domain/model/BoardPost'
import { Spacer } from '../ui/components/Spacer'
import { HStack } from '../ui/components/Stack'
import { UdongText } from '../ui/components/UdongText'

export const formatPostItemInfo = (
    post: BoardPost,
) => {
    if (post.displayType === PostDisplayType.FEED) {
        const { club, eventName } = post
        return <HStack alignItems={'center'}>
            <UdongText style={'ListContentUnderscore'}>{club?.name}</UdongText>
            {eventName &&
                <HStack>
                    <UdongText
                        style={'ListContentS'}
                        margin={'0 4px'}
                    >
                        {'>'}
                    </UdongText>
                    <UdongText style={'ListContentUnderscore'}>{eventName.name}</UdongText>
                </HStack>
            }
            <Spacer width={20}/>
        </HStack>
    }

    else if (post.displayType === PostDisplayType.CLUB) {
        const { eventName } = post as BoardPost
        if (!eventName) {
            return null
        }
        return <HStack alignItems={'center'}>
            <UdongText style={'ListContentUnderscore'}>{eventName.name}</UdongText>
            <Spacer width={20}/>
        </HStack>
    }

    else if (post.displayType === PostDisplayType.EVENT) {
        return null
    }
}

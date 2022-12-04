import { BoardPost, ListItemPost, PostDisplayType } from '../domain/model/ListItemPost'
import { Spacer } from '../ui/components/Spacer'
import { HStack } from '../ui/components/Stack'
import { UdongText } from '../ui/components/UdongText'

// 나중에 type에 EventPost, FeedPost까지 추가
export const formatPostItemInfo = (
    post: ListItemPost | BoardPost,
) => {
    if (post.displayType === PostDisplayType.FEED) {
        const { clubName, eventName } = post as ListItemPost
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
                    <UdongText style={'ListContentUnderscore'}>{eventName.name}</UdongText>
                </HStack>
            }
            <Spacer width={30}/>
        </HStack>
    }

    else if (post.displayType === PostDisplayType.BOARD) {
        const { eventName } = post as BoardPost
        if (!eventName) {
            return null
        }
        return <HStack>
            <UdongText style={'ListContentUnderscore'}>{eventName.name}</UdongText>
            <Spacer width={30}/>
        </HStack>
    }

    else if (post.displayType === PostDisplayType.EVENT) {
        return null
    }
}

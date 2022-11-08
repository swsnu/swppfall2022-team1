import { HStack, VStack } from '../../../../components/Stack'
import { UdongChip } from '../../../../components/UdongChip'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { UserItem } from '../../../shared/UserItem'

export type UserType = {
  name: string
  isMe: boolean
  isAdmin: boolean
}

interface SchedulingUserSingleListViewProps {
    title: string
    list: UserType[]
}

const SchedulingUserSingleListView = (props: SchedulingUserSingleListViewProps) => {
    const { title, list } = props
    return (
        <VStack
            width={'50%'}
            alignItems={'start'}
            justifyContent={'center'}
        >
            <HStack gap={10}>
                <UdongText style={'ListTitleS'}>{title}</UdongText>
                <UdongChip
                    text={`${list.length}`}
                    color={UdongColors.Primary}
                    style={'fill'}
                    small
                />
            </HStack>
            {list.map((user, idx) => <UserItem
                key={idx}
                small
                {...user}
            />)}
        </VStack>
    )
}

interface SchedulingUserListViewProps {
    leftTitle: string
    rightTitle: string
    leftList: UserType[]
    rightList: UserType[]
}

export const SchedulingUserListView = (props: SchedulingUserListViewProps) => {
    const { leftTitle, rightTitle, leftList, rightList } = props
    return (
        <HStack alignItems={'start'}>
            <SchedulingUserSingleListView
                title={leftTitle}
                list={leftList}
            />
            <SchedulingUserSingleListView
                title={rightTitle}
                list={rightList}
            />
        </HStack>
    )
}

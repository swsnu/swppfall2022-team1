import { HStack, VStack } from '../../../../components/Stack'
import { UdongChip, UdongChipColorStyle } from '../../../../components/UdongChip'
import { UdongText } from '../../../../components/UdongText'
import { UserItem } from '../../../shared/UserItem'

export type UserType = {
  name: string
  isMe: boolean
  isAdmin: boolean
}

interface SchedulingUserSingleListViewProps {
    title: string
    list: UserType[]
    color: string
    style: UdongChipColorStyle
}

const SchedulingUserSingleListView = (props: SchedulingUserSingleListViewProps) => {
    const { title, list, color, style } = props
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
                    color={color}
                    style={style}
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
    color: string
    leftTitle: string
    rightTitle: string
    leftList: UserType[]
    rightList: UserType[]
}

export const SchedulingUserListView = (props: SchedulingUserListViewProps) => {
    const { color, leftTitle, rightTitle, leftList, rightList } = props
    return (
        <HStack alignItems={'start'}>
            <SchedulingUserSingleListView
                title={leftTitle}
                list={leftList}
                color={color}
                style={'fill'}
            />
            <SchedulingUserSingleListView
                title={rightTitle}
                list={rightList}
                color={color}
                style={'line'}
            />
        </HStack>
    )
}

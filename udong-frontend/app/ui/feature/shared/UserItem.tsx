import styled from '@emotion/styled'

import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongChip } from '../../components/UdongChip'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'

interface UserItemProps {
    name: string
    isMe?: boolean
    isAdmin?: boolean
}

export const UserItem = (props: UserItemProps) => {
    const { name, isMe = false, isAdmin = false } = props
    return <HStack
        alignItems={'center'}
        paddingVertical={5}
    >
        <CircularProfileIcon/>
        <Spacer width={10}/>

        <UdongText style={'GeneralContent'}>{name}</UdongText>

        {isMe &&
            <HStack>
                <Spacer width={10}/>
                <UdongChip
                    style={'line'}
                    text={'me'}
                />
            </HStack>
        }
        {isAdmin &&
            <HStack>
                <Spacer width={10}/>
                <UdongChip
                    style={'line'}
                    text={'관리자'}
                />
            </HStack>
        }
    </HStack>
}

const CircularProfileIcon = styled.div({
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: UdongColors.GrayBright,
})

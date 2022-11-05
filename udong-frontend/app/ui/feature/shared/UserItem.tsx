import styled from '@emotion/styled'

import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongChip } from '../../components/UdongChip'
import { UdongImage } from '../../components/UdongImage'
import { UdongText } from '../../components/UdongText'
import remove from '../../icons/IcClose.png'
import { UdongColors } from '../../theme/ColorPalette'

interface UserItemProps {
    name: string
    isMe?: boolean
    isAdmin?: boolean
    hasRemoveButton?: boolean
}

export const UserItem = (props: UserItemProps) => {
    const { name, isMe = false, isAdmin = false, hasRemoveButton = false } = props
    return <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'100%'}
        paddingVertical={5}
    >
        <HStack alignItems={'center'}>
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

        {hasRemoveButton &&
            <UdongImage
                src={remove.src}
                height={10}
                width={10}
            />
        }
    </HStack>
}

const CircularProfileIcon = styled.div({
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: UdongColors.GrayBright,
})

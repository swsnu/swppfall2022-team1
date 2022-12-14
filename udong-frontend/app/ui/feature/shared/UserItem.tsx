import styled from '@emotion/styled'

import { useImage } from '../../../hooks/useImage'
import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongChip } from '../../components/UdongChip'
import { UdongImage } from '../../components/UdongImage'
import { UdongText } from '../../components/UdongText'
import remove from '../../icons/IcClose.png'
import { UdongColors } from '../../theme/ColorPalette'

interface UserItemProps {
    name: string
    id?: number
    isMe?: boolean
    isAdmin?: boolean
    onRemoveUser?: (userId: number) => void
    small?: boolean
    imageKey: string
    imageClickable?: boolean
}

export const UserItem = (props: UserItemProps) => {
    const { id, name, isMe = false, isAdmin = false, onRemoveUser, small = false, imageKey, imageClickable = false } = props

    const imageUrl = useImage(imageKey ?? '')

    return <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'100%'}
        paddingVertical={5}
    >
        <HStack alignItems={'center'}>
            {
                imageKey ? (
                    <UdongImage
                        src={imageUrl ?? ''}
                        height={30}
                        width={30}
                        clickable={imageClickable}
                    />
                ) : (
                    <CircularProfileIcon
                        style={small ? { width: 30, height: 30 } : {}}
                    />
                )
            }
            <Spacer width={10}/>

            <UdongText
                style={'GeneralContent'}
                cursor={'pointer'}
            >{name}</UdongText>

            {isMe &&
                <HStack>
                    <Spacer width={10}/>
                    <UdongChip
                        color={UdongColors.Primary}
                        style={'line'}
                        text={'me'}
                        small={small}
                    />
                </HStack>
            }
            {isAdmin &&
                <HStack>
                    <Spacer width={10}/>
                    <UdongChip
                        color={UdongColors.Primary}
                        style={'line'}
                        text={'관리자'}
                        small={small}
                    />
                </HStack>
            }
        </HStack>

        {onRemoveUser && id &&
            <UdongImage
                onClick={() => onRemoveUser(id)}
                src={remove.src}
                height={10}
                width={10}
                clickable
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

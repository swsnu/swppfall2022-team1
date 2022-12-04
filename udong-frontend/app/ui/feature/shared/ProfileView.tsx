import styled from '@emotion/styled'
import { ReactNode, useCallback, useRef, useState } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongChip } from '../../components/UdongChip'
import { UdongImage } from '../../components/UdongImage'
import { UdongText } from '../../components/UdongText'
import { UdongTextField } from '../../components/UdongTextField'
import camera from '../../icons/IcCamera.png'
import check from '../../icons/IcCheck.png'
import udong from '../../icons/IcDong.png'
import google from '../../icons/IcGoogle.png'
import edit from '../../icons/IcPencil.png'
import refresh from '../../icons/IcRefresh.png'
import { UdongColors } from '../../theme/ColorPalette'

interface ProfileViewProps {
    name: string
    code?: string
    email?: string
    showCameraButton?: boolean
    onClickEditNameButton?: (name: string) => void
    showAdminBadge?: boolean
    bottomItem: ReactNode
}

export const ProfileView = (props: ProfileViewProps) => {
    const {
        name,
        code,
        email,
        showCameraButton = false,
        onClickEditNameButton,
        showAdminBadge = false,
        bottomItem,
    } = props
    const [isNameInputVisible, setIsNameInputVisible] = useState(false)
    const [changedName, setChangedName] = useState('')

    const nameRef = useRef<HTMLInputElement | undefined>(null)

    const handleEditNickname = useCallback(() => {
        if (!isNameInputVisible) {
            setIsNameInputVisible(true)
        } else {
            if (onClickEditNameButton) {
                onClickEditNameButton(changedName)
            }
            setIsNameInputVisible(false)
        }
    }, [isNameInputVisible, changedName, onClickEditNameButton])

    return <VStack alignItems={'center'}>
        <BackgroundCircle>
            <UdongImage
                src={udong.src}
                height={100}
                width={100}
            />
            {showCameraButton &&
                <UdongImage
                    src={camera.src}
                    height={50}
                    width={50}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                    }}
                />
            }
        </BackgroundCircle>

        <Spacer height={15}/>
        <HStack alignItems={'center'}>
            {isNameInputVisible ?
                <UdongTextField
                    inputRef={nameRef}
                    defaultValue={name}
                    onChange={() => setChangedName(nameRef.current?.value ?? '')}
                />
                :
                <UdongText style={'GeneralContent'}>{name}</UdongText>
            }

            {onClickEditNameButton &&
                <UdongImage
                    src={isNameInputVisible ? check.src : edit.src}
                    height={20}
                    width={20}
                    style={{ marginLeft: 8 }}
                    onClick={handleEditNickname}
                />
            }
        </HStack>

        <Spacer height={15}/>
        {code &&
            <HStack>
                <UdongText style={'ListContentUnderscore'}>고유코드</UdongText>
                <Spacer width={5}/>
                <UdongText style={'ListContentS'}>{code}</UdongText>
                <Spacer width={5}/>
                <UdongImage
                    src={refresh.src}
                    height={20}
                    width={20}
                />
            </HStack>
        }

        {email &&
            <HStack>
                <UdongImage
                    src={google.src}
                    height={20}
                    width={20}
                />
                <Spacer width={5}/>
                <UdongText style={'ListContentS'}>{email}</UdongText>
            </HStack>
        }

        {showAdminBadge &&
            <UdongChip
                color={UdongColors.Primary}
                style={'line'}
                text={'관리자'}
            />
        }

        <Spacer height={90}/>
        {bottomItem}
    </VStack>
}

const BackgroundCircle = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: UdongColors.GrayBright,
    borderRadius: 300,
    height: 200,
    width: 200,
})

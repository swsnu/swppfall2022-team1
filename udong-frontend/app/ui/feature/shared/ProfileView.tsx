import styled from '@emotion/styled'
import { ReactNode, useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../domain/store'
import { clubActions } from '../../../domain/store/club/ClubSlice'
import { userActions } from '../../../domain/store/user/UserSlice'
import { ImageAPI } from '../../../infra/api/ImageAPI'
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
    clubId?: number
    userId?: number
    name: string
    code?: string
    email?: string
    image?: string
    timeTable?: boolean[][]
    showCameraButton?: boolean
    onClickEditNameButton?: (name: string) => void
    onRefresh?: () => void
    showAdminBadge?: boolean
    bottomItem: ReactNode
}

export const ProfileView = (props: ProfileViewProps) => {
    const {
        clubId = undefined,
        userId = undefined,
        name,
        code,
        email,
        image,
        timeTable = undefined,
        showCameraButton = false,
        onClickEditNameButton,
        onRefresh,
        showAdminBadge = false,
        bottomItem,
    } = props
    const [isNameInputVisible, setIsNameInputVisible] = useState(false)
    const [changedName, setChangedName] = useState(name)

    const nameRef = useRef<HTMLInputElement | undefined>(null)
    const dispatch = useDispatch<AppDispatch>()

    const handleEditNickname = useCallback(() => {
        if (!isNameInputVisible) {
            setIsNameInputVisible(true)
        } else {
            if (onClickEditNameButton) {
                onClickEditNameButton(changedName)
            }
            if (changedName) {
                setIsNameInputVisible(false)
            }
        }
    }, [isNameInputVisible, changedName, onClickEditNameButton])

    return <VStack alignItems={'center'}>
        <BackgroundCircle>
            <UdongImage
                src={image ?? udong.src}
                border={`${UdongColors.GrayBright} thick solid`}
                borderRadius={100}
                height={200}
                width={200}
            />
            {showCameraButton && (
                <>
                    <label htmlFor='upload-image'>
                        <UdongImage
                            src={camera.src}
                            height={50}
                            width={50}
                            clickable={true}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
                        />
                    </label>
                    <input
                        id='upload-image'
                        type={'file'}
                        accept={'image/*'}
                        onChange={async (e) => {
                            const file = e.target.files?.item(0)
                            if (!file || !e.target.validity.valid) {return}
                            if (file.size >= 10485760)
                            {alert('?????? ????????? ?????? ?????????.')}
                            try {
                                const newImage = await ImageAPI.getUploadUrl(file.name)
                                await ImageAPI.uploadImage(newImage.url, file)
                                if(clubId) {
                                    dispatch(clubActions.editClub({
                                        clubId: clubId,
                                        club: {
                                            id: clubId, name: name, code: code ?? '', image: newImage.key, createdAt: '', updatedAt: '',
                                        },
                                    }))
                                }
                                if(userId) {
                                    dispatch(userActions.editMyProfile({
                                        id: userId,
                                        name: name,
                                        email: email ?? '',
                                        imageUrl: newImage.key,
                                        timeTable: timeTable ?? [],
                                    }))
                                }
                            } catch {
                                alert('????????? ????????? ??? ??? ????????????')
                            }

                        }}
                        style={{ display: 'none' }}
                    />
                </>
            )}
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
                    height={17}
                    width={17}
                    style={{ marginLeft: 8 }}
                    clickable={true}
                    onClick={handleEditNickname}
                />
            }
        </HStack>

        <Spacer height={15}/>
        {code &&
            <HStack alignItems={'center'}>
                <UdongText style={'ListContentS'}>????????????</UdongText>
                <Spacer width={10}/>
                <UdongText
                    style={'ListContentUnderscore'}
                    cursor={'pointer'}
                    onClick={async ()=>{
                        try {
                            await navigator.clipboard.writeText(code)
                            toast.success('?????????????????????')
                        } catch (e) {
                            toast.error('?????? ??????????????????')
                        }
                    }}
                >{code}</UdongText>
                <Spacer width={10}/>
                {onRefresh &&
                    <UdongImage
                        src={refresh.src}
                        clickable={true}
                        height={18}
                        width={18}
                        onClick={onRefresh}
                    />
                }
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
                text={'?????????'}
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
})

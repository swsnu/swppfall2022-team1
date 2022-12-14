import styled from '@emotion/styled'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../domain/store'
import { authSelector } from '../../../domain/store/auth/AuthSelector'
import { authActions } from '../../../domain/store/auth/AuthSlice'
import { clubSelector } from '../../../domain/store/club/ClubSelector'
import { userSelector } from '../../../domain/store/user/UserSelector'
import { userActions } from '../../../domain/store/user/UserSlice'
import { useImage } from '../../../hooks/useImage'
import { HStack } from '../../components/Stack'
import { UdongImage } from '../../components/UdongImage'
import { UdongText } from '../../components/UdongText'
import Logo from '../../icons/Logo.png'
import { UdongColors } from '../../theme/ColorPalette'

interface HeaderProps {
    type: HeaderPageType
    clubId?: number
}

export type HeaderPageType = HEADER_PAGE

export enum HEADER_PAGE {
    NONE,
    MAIN,
    MY_PAGE,
    CLUB,
}

export const Header = ({ type, clubId }: HeaderProps) => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { status } = useSession()

    const isLoggedIn = useSelector(authSelector.isLoggedIn)
    const isLoading = useSelector(authSelector.isLoading)
    const club = useSelector(clubSelector.selectedClub)
    const userMe = useSelector(userSelector.userMe)

    const profileUrl = useImage(userMe?.imageUrl ?? '')

    const handleLogout = useCallback(async () => {
        const response = await dispatch(authActions.logout())
        if (response.type === `${authActions.logout.typePrefix}/fulfilled`) {
            signOut({ redirect: false })
        }
    }, [dispatch])

    useEffect(() => {
        if (type !== HEADER_PAGE.NONE && status === 'unauthenticated') {
            handleLogout()
        }
    }, [handleLogout, status, type])

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push('/login')
        }
    }, [isLoggedIn, isLoading]) // eslint-disable-line

    useEffect(() => {
        dispatch(userActions.getMyProfile())
    }, [dispatch])

    if (type === HEADER_PAGE.NONE) {return null}

    return (
        <HeaderContainer>
            <HStack
                height={80}
                justifyContent={'space-between'}
                alignItems={'center'}
                paddingHorizontal={30}
            >
                <HStack
                    alignItems={'center'}
                    gap={15}
                >
                    <UdongImage
                        src={Logo.src}
                        height={50}
                        width={160}
                        onClick={() => {
                            if (router.pathname === '/' && router.query['tab'] !== 'mydong'){
                                router.reload()
                            } else {
                                router.push('/')
                            }
                        }}
                        clickable={true}
                    />
                    {type === HEADER_PAGE.CLUB && club &&
                        <HStack onClick={() => router.push(`/club/${clubId}`)}>
                            <UdongText
                                style={'Header'}
                                color={UdongColors.Primary}
                                cursor={'pointer'}
                            >{club.name}</UdongText>
                        </HStack>
                    }
                </HStack>
                <HStack
                    alignItems={'center'}
                    gap={15}
                >
                    <HStack onClick={handleLogout}>
                        <UdongText
                            style={'Header'}
                            color={UdongColors.GrayDark}
                            cursor={'pointer'}
                        >로그아웃</UdongText>
                    </HStack>
                    <HStack
                        width={42}
                        justifyContent={'center'}
                    >
                        {
                            type === HEADER_PAGE.MY_PAGE
                                ? (
                                    <UdongImage
                                        src={profileUrl ?? ''}
                                        height={42}
                                        width={42}
                                        borderRadius={21}
                                        border={`2px solid ${UdongColors.Primary}`}
                                    />
                                ) : (
                                    <UdongImage
                                        src={profileUrl ?? ''}
                                        height={42}
                                        width={42}
                                        borderRadius={21}
                                        border={`2px solid ${UdongColors.GrayBright}`}
                                        clickable
                                        onClick={() => router.push('/mypage')}
                                    />
                                )
                        }
                    </HStack>
                </HStack>
            </HStack>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div({
    position: 'sticky',
    top: 0,
    width: '100%',
    backgroundColor: UdongColors.White,
    zIndex: 100,
})

import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { HStack } from '../../components/Stack'
import { UdongImage } from '../../components/UdongImage'
import { UdongText } from '../../components/UdongText'
import Logo from '../../icons/Logo.png'
import { UdongColors } from '../../theme/ColorPalette'

interface HeaderProps {
    type: HearPageType
    clubId?: number
}

export type HearPageType = HEADER_PAGE

export enum HEADER_PAGE {
    NONE,
    MAIN,
    MY_PAGE,
    CLUB,
}

export const Header = ({ type, clubId }: HeaderProps) => {
    const router = useRouter()
    const clubName = '단풍'

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
                    {type === HEADER_PAGE.CLUB ?
                        <HStack onClick={() => router.push(`/club/${clubId}`)}>
                            <UdongText
                                style={'Header'}
                                color={UdongColors.Primary}
                                cursor={'pointer'}
                            >{clubName}</UdongText>
                        </HStack>
                        : null
                    }
                </HStack>
                <HStack
                    alignItems={'center'}
                    gap={15}
                >
                    <div onClick={() => router.push('/')}>
                        <UdongText
                            style={'Header'}
                            color={UdongColors.GrayDark}
                            cursor={'pointer'}
                        >로그아웃</UdongText>
                    </div>
                    <HStack
                        width={42}
                        justifyContent={'center'}
                    >
                        {type === HEADER_PAGE.MY_PAGE ?
                            <CircularProfileIconClicked/>
                            : <CircularProfileIcon onClick={() => router.push('/mypage')}/>
                        }
                    </HStack>
                </HStack>
            </HStack>
        </HeaderContainer>
    )
}

const CircularProfileIcon = styled.div({
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: UdongColors.GrayBright,
    cursor: 'pointer',
})

const CircularProfileIconClicked = styled.div({
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: UdongColors.GrayBright,
    border: `2px solid ${UdongColors.Primary}`,
})

const HeaderContainer = styled.div({
    position: 'sticky',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
})

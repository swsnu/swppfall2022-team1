import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongButton } from '../../components/UdongButton'
import { UdongImage } from '../../components/UdongImage'
import { UdongText } from '../../components/UdongText'
import back from '../../icons/IcArrowBack.png'
import { UdongColors } from '../../theme/ColorPalette'

interface DetailPageHeaderProps {
    type: 'post' | 'event'
    title: string
    subtitle?: string
}

export const DetailPageHeader = (props: DetailPageHeaderProps) => {
    const { type, title, subtitle } = props
    const router = useRouter()

    const handleOnClickBack = useCallback(() => {
        if (type === 'event') {
            router.push('/club/1/?tab=event')
        } else {
            router.push('/club/1')
        }
    }, [])

    return <VStack>
        <Spacer height={50}/>
        <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <HStack
                style={{ marginLeft: 'auto' }}
                flex={1}
                onClick={handleOnClickBack}
            >
                <UdongImage
                    src={back.src}
                    height={40}
                    width={40}
                />
            </HStack>

            <VStack alignItems={'center'}>
                <UdongText
                    style={'TabSelected'}
                    color={UdongColors.GrayDark}
                >
                    {title}
                </UdongText>
                <UdongText
                    style={'GeneralContent'}
                    color={UdongColors.Primary}
                    fontWeight={'bold'}
                >
                    {subtitle}
                </UdongText>
            </VStack>

            <HStack
                justifyContent={'end'}
                alignItems={'center'}
                style={{ marginRight: 'auto' }}
                flex={1}
            >
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={() => console.log('수정하기')}
                >
                    수정하기
                </UdongButton>

                <Spacer width={15}/>

                <UdongButton
                    style={'line'}
                    color={UdongColors.Warning}
                    height={40}
                    onClick={() => console.log('삭제하기')}
                >
                    삭제하기
                </UdongButton>
            </HStack>
        </HStack>
    </VStack>
}

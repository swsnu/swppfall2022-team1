import { ReactNode } from 'react'

import back from '../icons/IcArrowBack.png'
import { UdongColors } from '../theme/ColorPalette'
import { HStack, VStack } from './Stack'
import { UdongImage } from './UdongImage'
import { UdongText } from './UdongText'

interface UdongHeaderProps {
    title: string
    subtitle?: string
    onGoBack: () => void
    rightButtons: ReactNode
}

export const UdongHeader = (props: UdongHeaderProps) => {
    const { onGoBack, title, subtitle, rightButtons } = props

    return <VStack>
        <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <HStack
                style={{ marginLeft: 'auto' }}
                flex={1}
                onClick={onGoBack}
            >
                <UdongImage
                    src={back.src}
                    height={40}
                    width={40}
                    clickable={true}
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
                {rightButtons}
            </HStack>
        </HStack>
    </VStack>
}

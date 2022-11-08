import { useRouter } from 'next/router'

import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongImage } from '../../../components/UdongImage'
import { UdongText } from '../../../components/UdongText'
import { UdongColors } from '../../../theme/ColorPalette'

interface ClubItemProps {
    imageSrc: string
    name: string
}

export const ClubItem = (props: ClubItemProps) => {
    const { imageSrc, name } = props
    const router = useRouter()

    return <VStack
        alignItems={'center'}
        width={'fit-content'}
        onClick={() => router.push('/club/1')}
    >
        <VStack
            style={{
                borderRadius: 30,
                border: `2px solid ${UdongColors.GrayBright}`,
            }}
        >
            <UdongImage
                src={imageSrc}
                height={160}
                width={160}
                borderRadius={30}
            />
        </VStack>
        <Spacer height={8}/>
        <UdongText style={'GeneralTitle'}>{name}</UdongText>
        <Spacer height={8}/>
    </VStack>
}

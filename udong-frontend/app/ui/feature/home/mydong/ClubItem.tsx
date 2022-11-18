import { useRouter } from 'next/router'

import { Club } from '../../../../domain/model/Club'
import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongImage } from '../../../components/UdongImage'
import { UdongText } from '../../../components/UdongText'
import { UdongColors } from '../../../theme/ColorPalette'

interface ClubItemProps {
    imageSrc: string
    club: Club
}

export const ClubItem = (props: ClubItemProps) => {
    const { imageSrc, club } = props
    const router = useRouter()

    return <VStack
        alignItems={'center'}
        width={'fit-content'}
        onClick={() => router.push(`/club/${club.id}`)}
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
                clickable={true}
            />
        </VStack>
        <Spacer height={8}/>
        <UdongText style={'GeneralTitle'}>{club.name}</UdongText>
        <Spacer height={8}/>
    </VStack>
}

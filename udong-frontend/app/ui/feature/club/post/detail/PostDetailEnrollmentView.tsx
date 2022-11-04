import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'

export const PostDetailEnrollmentView = () => {
    return <VStack>
        <Spacer height={60}/>
        <VStack alignItems={'center'}>
            <UdongText
                style={'GeneralContent'}
                color={UdongColors.Primary}
            >
                현재 n명 지원
            </UdongText>
        </VStack>

        <Spacer height={30}/>

        <HStack justifyContent={'space-between'}>
            <HStack
                flex={1}
                style={{ marginLeft: 'auto' }}
            />

            <HStack
                flex={1}
                justifyContent={'center'}
            >
                <UdongButton
                    style={'fill'}
                    onClick={() => {return}}
                >
                    현황 보기
                </UdongButton>

                <Spacer width={60}/>

                <UdongButton
                    style={'fill'}
                    onClick={() => {return}}
                >
                    지원하기
                </UdongButton>
            </HStack>

            <HStack
                flex={1}
                style={{ marginRight: 'auto' }}
                justifyContent={'end'}
            >
                <UdongButton
                    style={'line'}
                    onClick={() => {return}}
                >
                    마감하기
                </UdongButton>
            </HStack>
        </HStack>
    </VStack>
}

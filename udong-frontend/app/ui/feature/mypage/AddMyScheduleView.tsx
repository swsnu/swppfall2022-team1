import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongFloatingContainer } from '../../components/UdongFloatingContainer'
import { UdongImage } from '../../components/UdongImage'
import { UdongText } from '../../components/UdongText'
import add from '../../icons/IcPlus.png'

export const AddMyScheduleView = () => {
    return <UdongFloatingContainer
        width={'calc(50% - 50px)'}
        height={560}
        padding={'35px 50px'}
    >
        <HStack alignItems={'center'}>
            <UdongText style={'GeneralTitle'}>고정 시간표</UdongText>
            <Spacer width={30}/>
            <UdongText style={'GeneralContent'}>시간표를 등록해주세요</UdongText>
        </HStack>

        <VStack
            alignItems={'center'}
            justifyContent={'center'}
            height={'100%'}
        >
            <UdongImage
                src={add.src}
                height={50}
                width={50}
            />
        </VStack>
    </UdongFloatingContainer>
}

import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongColors } from '../../../../theme/ColorPalette'

export const EventCalendar = () => {
    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <h1>여기가 찐 캘린더! 캘린더만!!!</h1>
        <p>이 child부터가 지연이 영역</p>
    </VStack>
}

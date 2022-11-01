import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongColors } from '../../../../theme/ColorPalette'
import { EventCalendar } from './EventCalendar'

export const EventCalendarView = () => {
    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayDark}
        />
        <p>여기는 캘린더 + 날짜 없는 행사 목록 컴포넌트 둘다 보여주는 view, 일단 무시해도 됨</p>

        <EventCalendar/>
    </VStack>
}

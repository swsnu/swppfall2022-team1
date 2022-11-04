import { useState } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongButton } from '../../components/UdongButton'
import { UdongFloatingContainer } from '../../components/UdongFloatingContainer'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { DraggableTimeTable } from '../shared/DraggableTimeTable'

const dummy_data = Array(7).fill(0).map(() => Array(48).fill(false))

export const AddMyScheduleView = () => {
    const [timetable, setTimetable] = useState(dummy_data)

    return <UdongFloatingContainer
        width={'calc(50% - 50px)'}
        padding={'35px 50px'}
        alignItems={'center'}
        gap={30}
    >
        <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'100%'}
        >
            <UdongText style={'GeneralTitle'}><span style={{ color: UdongColors.Primary }}>고정 시간표</span>를 입력해주세요</UdongText>
            <Spacer width={30}/>
            <UdongButton
                onClick={() => console.log(timetable)}
                style={'fill'}
            >저장하기</UdongButton>
        </HStack>
        <DraggableTimeTable
            days={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']}
            startTime={0}
            selected={timetable}
            setSelected={setTimetable}
        />
    </UdongFloatingContainer>
    /*
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
    */
}

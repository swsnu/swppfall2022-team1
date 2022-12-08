import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { User } from '../../../domain/model/User'
import { AppDispatch } from '../../../domain/store'
import { userActions } from '../../../domain/store/user/UserSlice'
import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongButton } from '../../components/UdongButton'
import { UdongFloatingContainer } from '../../components/UdongFloatingContainer'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { DraggableTimeTable } from '../shared/DraggableTimeTable'

interface AddMyScheduleViewProps {
    me: User
}

export const AddMyScheduleView = (props: AddMyScheduleViewProps) => {
    const { me } = props
    const [timeTable, setTimeTable] = useState(me.timeTable)
    const dispatch = useDispatch<AppDispatch>()

    const handleEditTimetable = () => dispatch(userActions.editMyProfile({ ...me, timeTable }))

    return <UdongFloatingContainer
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
                onClick={handleEditTimetable}
                style={'fill'}
            >저장하기</UdongButton>
        </HStack>
        <DraggableTimeTable
            days={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']}
            startTime={0}
            selected={timeTable}
            setSelected={setTimeTable}
            selectColor={UdongColors.Primary50}
        />
    </UdongFloatingContainer>
}

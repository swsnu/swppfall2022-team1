import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getDay } from '../../../../../utility/functions'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DraggableTimeTable } from '../../../shared/DraggableTimeTable'
import { SlashedBox } from '../../../shared/SlashedBox'

const timetableDummy = [false, false, true, true, false, false, true].map((x) => Array(48).fill(x))
const schedulingDummy = {
    startTime: 12,
    endTime: 18,
    dates: [
        new Date(2022, 11, 6),
        new Date(2022, 11, 9),
        new Date(2022, 11, 10),
        new Date(2022, 11, 11),
    ],
    //dates: null,
    weekdays: [true, true, true, false, true, false, false],
}

export const PostDetailSchedulingView = () => {
    const router = useRouter()
    const [selected, setSelected] = useState<boolean[][]|null>(null)

    let header: string[]
    let fixed: boolean[][]

    if(schedulingDummy.dates) {
        header = schedulingDummy.dates.map(date => `${date.getMonth()}/${date.getDate()}`)
        fixed = schedulingDummy.dates.map(date => timetableDummy[getDay(date)].slice())
    }
    else {
        header = ['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN'].filter((_, idx) => schedulingDummy.weekdays?.[idx])
        fixed = timetableDummy.filter((_, idx) => schedulingDummy.weekdays?.[idx])
    }

    useEffect(() => {
        const dayCnt = schedulingDummy.dates
            ? schedulingDummy.dates.length
            : (schedulingDummy.weekdays ?? []).filter((v) => v).length
        setSelected(Array(dayCnt).fill(0).map(() => Array((schedulingDummy.endTime - schedulingDummy.startTime) * 2)))
    }, [])

    return <VStack
        alignItems={'center'}
        width={'fit-content'}
        gap={10}
        style={{ alignSelf: 'center' }}
    >
        <HStack
            gap={10}
            style={{ alignSelf: 'end' }}
        >
            <SlashedBox
                style={{
                    width: 40,
                    height: 20,
                    borderColor: UdongColors.GrayNormal,
                    borderWidth: 1,
                    borderStyle: 'solid',
                }}
            />
            <UdongText style={'GeneralContent'}>내 고정 시간표</UdongText>
        </HStack>
        {selected !== null && <DraggableTimeTable
            days={header}
            startTime={schedulingDummy.startTime}
            selected={selected}
            gray={fixed}
            setSelected={setSelected as (f: ((x: boolean[][]) => boolean[][])) => void}
            selectColor={UdongColors.PrimaryBright}
        />}
        <HStack
            justifyContent={'space-around'}
            width={'100%'}
        >
            <UdongButton
                style={'fill'}
                onClick={() => router.push('/club/1/post/1/status')}
            >
                현황 보기
            </UdongButton>

            <UdongButton
                style={'fill'}
                onClick={() => {return}}
            >
                일정 제출하기
            </UdongButton>
        </HStack>
        <UdongButton
            style={'line'}
            onClick={() => router.push('/club/1/post/1/close')}
        >
            마감하기
        </UdongButton>
    </VStack>
}

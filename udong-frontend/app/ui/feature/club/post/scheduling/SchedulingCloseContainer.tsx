import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongText } from '../../../../components/UdongText'
import { DraggableTimeTable } from '../../../shared/DraggableTimeTable'
import { SchedulingCloseModal } from './SchedulingCloseModal'

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
    availableTime: [
        {
            user: { id: 1, name: 'user1' },
            time: [
                [true, true, true, true, true, true],
                [true, true, false, false, true, false],
                [true, true, false, false, true, false],
                [false, false, false, false, false, false],
            ],
        },
        {
            user: { id: 2, name: 'user2' },
            time: [
                [false, false, false, false, false, false],
                [true, true, true, true, true, true],
                [true, true, false, false, true, false],
                [true, true, false, false, true, false],
            ],
        },
    ],
}

export const SchedulingCloseContainer = () => {
    const router = useRouter()
    const schedulingData = useMemo(() => schedulingDummy, [])
    const [selected, setSelected] = useState<boolean[][]|null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const header = useMemo(() => (
        schedulingData.dates ?
            schedulingData.dates.map(date => `${date.getMonth()}/${date.getDate()}`)
            : ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'].filter((_, idx) => schedulingData.weekdays?.[idx])
    ), [schedulingData])

    const data = useMemo(() => schedulingData.availableTime.reduce(
        (d, { time }) => d.map((colData, colIdx) => colData.map((x, rowIdx) => x + time[colIdx][rowIdx])),
        Array(header.length).fill(0).map(() => Array(schedulingData.endTime - schedulingData.startTime).fill(0)),
    ), [header, schedulingData])

    useEffect(() => {
        setSelected(Array(header.length).fill(0).map(() => Array((schedulingData.endTime - schedulingData.startTime) * 2)))
    }, [header, schedulingData])

    return (
        <VStack
            paddingHorizontal={16}
            gap={50}
        >
            <UdongHeader
                title={'MT 수요조사입니다'}
                onGoBack={() => router.back()}
                rightButtons={<UdongButton
                    style={'line'}
                    onClick={() => setModalOpen(true)}
                >마감하기</UdongButton>}
                subtitle={'일정 수합 중'}
            />
            <HStack
                gap={50}
                justifyContent={'center'}
            >
                <VStack alignItems={'start'}>
                    <UdongText style={'GeneralTitle'}>일정 수합 현황</UdongText>
                    <UdongText style={'GeneralContent'}>※ 클릭시 해당 시간에 참여 가능한 인원을 보여드립니다.</UdongText>
                    {selected !== null && <DraggableTimeTable
                        days={header}
                        startTime={schedulingDummy.startTime}
                        selected={selected}
                        setSelected={setSelected as (f: ((x: boolean[][]) => boolean[][])) => void}
                        data={data}
                        style={{ marginTop: 10 }}
                    />}
                </VStack>

            </HStack>

            <SchedulingCloseModal
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
            />
        </VStack>
    )
}

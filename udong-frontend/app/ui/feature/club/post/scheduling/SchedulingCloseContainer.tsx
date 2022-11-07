import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongText } from '../../../../components/UdongText'
import { DraggableTimeTable } from '../../../shared/DraggableTimeTable'
import { CellIdx } from '../../../shared/TimeTable'
import { SchedulingCloseModal } from './SchedulingCloseModal'
import { SchedulingUserListView } from './SchedulingUserListView'

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
            user: { id: 1, name: 'user1', auth: 'A' },
            time: [
                [true, true, true, true, true, true],
                [true, true, false, false, true, false],
                [true, true, false, false, true, false],
                [false, false, false, false, false, false],
            ],
        },
        {
            user: { id: 2, name: 'user2', auth: 'M' },
            time: [
                [false, false, false, false, false, false],
                [true, true, true, true, true, true],
                [true, true, false, false, true, false],
                [true, true, false, false, true, false],
            ],
        },
    ],
}
const myId = 1

const timeToStr = (x: number) => (x % 2 === 0 ? `${x / 2}:00` : `${(x - 1) / 2}:30`)

export const SchedulingCloseContainer = () => {
    const router = useRouter()
    const schedulingData = useMemo(() => schedulingDummy, [])
    const [selected, setSelected] = useState<boolean[][]|null>(null)
    const [hover, setHover] = useState<CellIdx|null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [ava, setAva] = useState<number[]>([])

    const users = useMemo(() => (
        schedulingData.availableTime.map(({ user: { id, name, auth } }) => ({ id, name, isMe: id === myId, isAdmin: auth === 'A' }))
    ), [schedulingData])

    const header = useMemo(() => (
        schedulingData.dates ?
            schedulingData.dates.map(date => `${date.getMonth()}/${date.getDate()}`)
            : ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'].filter((_, idx) => schedulingData.weekdays?.[idx])
    ), [schedulingData])

    const cnt: number[][] = useMemo(() => schedulingData.availableTime.reduce(
        (d, { time }) => d.map((colData, colIdx) => colData.map((x, rowIdx) => x + time[colIdx][rowIdx])),
        Array(header.length).fill(0).map(() => Array(schedulingData.endTime - schedulingData.startTime).fill(0)),
    ), [header, schedulingData])

    const best = useMemo(() => (
        cnt.reduce(
            (v, colData, colIdx) => v.concat(
                colData.map((x, rowIdx) => ({ cnt: x, day: header[colIdx], time: rowIdx + schedulingData.startTime })),
            ),
            [] as ({ cnt: number, day: string, time: number })[],
        ).sort((a, b) => b.cnt - a.cnt).slice(0, 3)
    ), [cnt, header, schedulingData])

    useEffect(() => {
        setSelected(Array(header.length).fill(0).map(() => Array((schedulingData.endTime - schedulingData.startTime) * 2)))
    }, [header, schedulingData])

    useEffect(() => setAva(
        schedulingData.availableTime.filter(({ time }) => (hover && time[hover.col][hover.row])).map(({ user }) => user.id),
    ), [hover, schedulingData])

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
                <VStack
                    alignItems={'start'}
                    width={'40%'}
                >
                    <UdongText style={'GeneralTitle'}>일정 수합 현황</UdongText>
                    <UdongText style={'GeneralContent'}>※ 클릭시 해당 시간에 참여 가능한 인원을 보여드립니다.</UdongText>
                    {selected !== null && <DraggableTimeTable
                        days={header}
                        startTime={schedulingDummy.startTime}
                        selected={selected}
                        setSelected={setSelected as (f: ((x: boolean[][]) => boolean[][])) => void}
                        onHover={setHover}
                        data={cnt}
                        style={{ marginTop: 10 }}
                    />}
                </VStack>

                <VStack
                    width={'40%'}
                    gap={50}
                >
                    <VStack>
                        <UdongText style={'GeneralTitle'}>Best 시간대</UdongText>
                        {best.map(({ cnt,  day, time }, idx) => (
                            <HStack key={idx}>
                                <UdongText
                                    style={'GeneralContent'}
                                    width={40}
                                >{cnt}명</UdongText>
                                <UdongText style={'GeneralContent'}>{day} {timeToStr(time)}~{timeToStr(time + 1)}</UdongText>
                            </HStack>
                        ))}
                    </VStack>
                    {selected !== null && (hover !== null && !selected[hover.col][hover.row]
                        ? (
                            <SchedulingUserListView
                                leftTitle='가능'
                                rightTitle='불가능'
                                leftList={users.filter(({ id }) => ava.includes(id))}
                                rightList={users.filter(({ id }) => !ava.includes(id))}
                            />
                        ) : <></>
                    )}
                </VStack>
            </HStack>

            <SchedulingCloseModal
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
            />
        </VStack>
    )
}

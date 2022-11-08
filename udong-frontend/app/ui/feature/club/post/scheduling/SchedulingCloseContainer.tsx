import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import { new2dArray, timeToStr } from '../../../../../utility/functions'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongText } from '../../../../components/UdongText'
import { DraggableTimeTable } from '../../../shared/DraggableTimeTable'
import { CellIdx } from '../../../shared/TimeTable'
import { SchedulingCloseModal } from './SchedulingCloseModal'
import { getAva, getInc, useData } from './SchedulingHooks'
import { SchedulingUserListView } from './SchedulingUserListView'

export const SchedulingCloseContainer = () => {
    const router = useRouter()

    const [selected, setSelected] = useState<boolean[][]|null>(null)
    const [hover, setHover] = useState<CellIdx|null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const { data, header, users, cnt, best } = useData()

    const ava = useMemo(() => getAva(data, hover), [data, hover])
    const inc = useMemo(() => selected ? getInc(data, selected) : [], [data, selected])

    useEffect(() => {
        setSelected(new2dArray(header.length, data.endTime - data.startTime, false))
    }, [header, data])

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
                        startTime={data.startTime}
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
                        ) : <SchedulingUserListView
                            leftTitle='포함'
                            rightTitle='미포함'
                            leftList={users.filter(({ id }) => inc.includes(id))}
                            rightList={users.filter(({ id }) => !inc.includes(id))}
                        />
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

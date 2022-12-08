import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { new2dArray } from '../../../../../utility/functions'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongColors } from '../../../../theme/ColorPalette'
import { CellIdx } from '../../../shared/TimeTable'
import { BestTimeView } from './BestTimeView'
import { SchedulingCloseModal } from './SchedulingCloseModal'
import { SchedulingCloseTableView } from './SchedulingCloseTableView'
import { getAva, getDayCnt, getInc, useData } from './SchedulingHooks'
import { SchedulingUserListView } from './SchedulingUserListView'

export const SchedulingCloseContainer = () => {
    const router = useRouter()

    const [selected, setSelected] = useState<boolean[][]|null>(null)
    const [hover, setHover] = useState<CellIdx|null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const { schedulingStatus, allUsers, participatedUserIds, cnt, best } = useData()
    useEffect(() => {
        if(schedulingStatus)
        {setSelected(new2dArray(getDayCnt(schedulingStatus), schedulingStatus.endTime - schedulingStatus.startTime, false))}
    }, [schedulingStatus])
    if(!schedulingStatus) {return null}

    const ava = getAva(schedulingStatus, hover)
    const inc = selected ? getInc(schedulingStatus, selected) : []

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
                <SchedulingCloseTableView
                    data={schedulingStatus}
                    selected={selected}
                    setSelected={setSelected}
                    setHover={setHover}
                    cnt={cnt}
                />

                <VStack
                    width={'40%'}
                    gap={50}
                >
                    <BestTimeView best={best}/>
                    {selected !== null && (hover !== null && !selected[hover.col][hover.row]
                        ? (
                            <SchedulingUserListView
                                leftTitle='가능'
                                rightTitle='불가능'
                                leftList={allUsers.filter(({ id }) => ava.includes(id))}
                                rightList={allUsers.filter(({ id }) => !ava.includes(id) && participatedUserIds.includes(id))}
                                color={UdongColors.Primary}
                            />
                        ) : (
                            <SchedulingUserListView
                                leftTitle='포함'
                                rightTitle='미포함'
                                leftList={allUsers.filter(({ id }) => inc.includes(id))}
                                rightList={allUsers.filter(({ id }) => !inc.includes(id) && participatedUserIds.includes(id))}
                                color={UdongColors.Secondary}
                            />
                        )
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

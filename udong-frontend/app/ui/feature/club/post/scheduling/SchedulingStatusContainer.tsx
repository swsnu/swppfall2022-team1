import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { HStack, VStack } from '../../../../components/Stack'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongColors } from '../../../../theme/ColorPalette'
import { CellIdx } from '../../../shared/TimeTable'
import { BestTimeView } from './BestTimeView'
import { SchedulingCloseModal } from './SchedulingCloseModal'
import { getAva, parseUsers, useData } from './SchedulingHooks'
import { SchedulingStatusTableView } from './SchedulingStatusTableView'
import { SchedulingUserListView } from './SchedulingUserListView'

const allUsersDummy = [
    { id: 1, name: 'user1', auth: 'A' },
    { id: 2, name: 'user2', auth: 'M' },
    { id: 3, name: 'user3', auth: 'A' },
]

export const SchedulingStatusContainer = () => {
    const router = useRouter()

    const [selected, setSelected] = useState<CellIdx|null>(null)
    const [hover, setHover] = useState<CellIdx|null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const { data, users, cnt, best } = useData()
    const allUsers = useMemo(() => parseUsers(allUsersDummy), [])

    const ava = useMemo(() => hover ? getAva(data, hover) : selected ? getAva(data, selected) : [], [data, hover, selected])

    return (
        <VStack
            paddingHorizontal={16}
            gap={50}
        >
            <UdongHeader
                title={'MT 수요조사입니다'}
                onGoBack={() => router.back()}
                rightButtons={<></>}
                subtitle={'일정 수합 중'}
            />
            <HStack
                gap={50}
                justifyContent={'center'}
            >
                <SchedulingStatusTableView
                    data={data}
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
                    {selected !== null || hover !== null
                        ? (
                            <SchedulingUserListView
                                leftTitle='가능'
                                rightTitle='불가능'
                                leftList={users.filter(({ id }) => ava.includes(id))}
                                rightList={users.filter(({ id }) => !ava.includes(id))}
                                color={UdongColors.Primary}
                            />
                        ) : (
                            <SchedulingUserListView
                                leftTitle='참여'
                                rightTitle='미참여'
                                leftList={users}
                                rightList={allUsers.filter(({ id }) => users.map(({ id }) => id).includes(id))}
                                color={UdongColors.GrayNormal}
                            />
                        )
                    }
                </VStack>
            </HStack>

            <SchedulingCloseModal
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
            />
        </VStack>
    )
}

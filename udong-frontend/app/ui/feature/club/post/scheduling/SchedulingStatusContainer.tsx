import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../../../domain/store'
import { clubActions } from '../../../../../domain/store/club/ClubSlice'
import { schedulingActions } from '../../../../../domain/store/post/scheduling/SchedulingSlice'
import { userActions } from '../../../../../domain/store/user/UserSlice'
import { convertQueryParamToString } from '../../../../../utility/handleQueryParams'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongColors } from '../../../../theme/ColorPalette'
import { CellIdx } from '../../../shared/TimeTable'
import { BestTimeView } from './BestTimeView'
import { getAva, useData } from './SchedulingHooks'
import { SchedulingStatusTableView } from './SchedulingStatusTableView'
import { SchedulingUserListView } from './SchedulingUserListView'

export const SchedulingStatusContainer = () => {
    const router = useRouter()
    const { clubId: rawClubId, postId: rawPostId } = router.query
    const postId = convertQueryParamToString(rawPostId)
    const clubId = convertQueryParamToString(rawClubId)

    const [selected, setSelected] = useState<CellIdx|null>(null)
    const [hover, setHover] = useState<CellIdx|null>(null)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if(postId) { dispatch(schedulingActions.getSchedulingStatus(postId)) }
    }, [dispatch, postId])

    useEffect(() => {
        if(clubId) { dispatch(clubActions.getClubMembers(+clubId))}
    }, [dispatch, clubId])

    useEffect(() => {
        dispatch(userActions.getMyProfile())
    }, [dispatch])

    const { schedulingStatus, allUsers, participatedUserIds, cnt, best } = useData()
    if(!schedulingStatus) {return null}

    const ava = hover
        ? getAva(schedulingStatus, hover)
        : selected
            ? getAva(schedulingStatus, selected)
            : []

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
                    {selected !== null || hover !== null
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
                                leftTitle='참여'
                                rightTitle='미참여'
                                leftList={allUsers.filter(({ id }) => participatedUserIds.includes(id))}
                                rightList={allUsers.filter(({ id }) => !participatedUserIds.includes(id))}
                                color={UdongColors.GrayNormal}
                            />
                        )
                    }
                </VStack>
            </HStack>
        </VStack>
    )
}

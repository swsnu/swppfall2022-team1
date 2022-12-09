import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../../../domain/store'
import { clubActions } from '../../../../../domain/store/club/ClubSlice'
import { postSelector } from '../../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../../domain/store/post/PostSlice'
import { schedulingActions } from '../../../../../domain/store/post/scheduling/SchedulingSlice'
import { userActions } from '../../../../../domain/store/user/UserSlice'
import { new2dArray } from '../../../../../utility/functions'
import { convertQueryParamToString } from '../../../../../utility/handleQueryParams'
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
    const { clubId: rawClubId, postId: rawPostId } = router.query
    const postId = convertQueryParamToString(rawPostId)
    const clubId = convertQueryParamToString(rawClubId)

    const [selected, setSelected] = useState<boolean[][]|null>(null)
    const [hover, setHover] = useState<CellIdx|null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const post = useSelector(postSelector.selectedPost)

    useEffect(() => {
        if(postId) {
            dispatch(postActions.getPost(postId))
            dispatch(schedulingActions.getSchedulingStatus(postId))
        }
    }, [dispatch, postId])

    useEffect(() => {
        if(clubId) { dispatch(clubActions.getClubMembers(+clubId))}
    }, [dispatch, clubId])

    useEffect(() => {
        dispatch(userActions.getMyProfile())
    }, [dispatch])

    const { schedulingStatus, allUsers, participatedUserIds, cnt, best } = useData()
    useEffect(() => {
        if(schedulingStatus) {
            setSelected(new2dArray(getDayCnt(schedulingStatus), schedulingStatus.endTime - schedulingStatus.startTime, false))
        }
    }, [schedulingStatus])

    const ava = useMemo(() => getAva(schedulingStatus, hover), [schedulingStatus, hover])
    const inc = useMemo(() => getInc(schedulingStatus, selected), [schedulingStatus, selected])

    if(!schedulingStatus || !post) {return null}

    return (
        <VStack
            paddingHorizontal={16}
            gap={50}
        >
            <UdongHeader
                title={post.title}
                onGoBack={() => router.back()}
                rightButtons={<UdongButton
                    style={'line'}
                    onClick={() => setModalOpen(true)}
                >마감하기</UdongButton>}
                subtitle={'일정 수합글'}
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
                selected={selected ?? new2dArray(getDayCnt(schedulingStatus), schedulingStatus.endTime - schedulingStatus.startTime, false)}
                inc={inc}
            />
        </VStack>
    )
}

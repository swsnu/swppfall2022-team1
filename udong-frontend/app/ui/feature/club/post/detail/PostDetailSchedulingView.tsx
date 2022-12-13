import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../../../domain/store'
import { clubActions } from '../../../../../domain/store/club/ClubSlice'
import { schedulingActions } from '../../../../../domain/store/post/scheduling/SchedulingSlice'
import { userSelector } from '../../../../../domain/store/user/UserSelector'
import { userActions } from '../../../../../domain/store/user/UserSlice'
import { getDay, new2dArray } from '../../../../../utility/functions'
import { convertQueryParamToString } from '../../../../../utility/handleQueryParams'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DraggableTimeTable } from '../../../shared/DraggableTimeTable'
import { SlashedBox } from '../../../shared/SlashedBox'
import { useData } from '../scheduling/SchedulingHooks'

export const PostDetailSchedulingView = () => {
    const router = useRouter()
    const { clubId: rawClubId, postId: rawPostId } = router.query
    const postId = convertQueryParamToString(rawPostId)
    const clubId = convertQueryParamToString(rawClubId)

    const [selected, setSelected] = useState<boolean[][]|null>(null)

    const dispatch = useDispatch<AppDispatch>()

    let header: string[]
    let fixed: boolean[][]

    useEffect(() => {
        if(postId) { dispatch(schedulingActions.getSchedulingStatus(postId)) }
    }, [dispatch, postId])

    useEffect(() => {
        if(clubId) {
            dispatch(clubActions.getClubMembers(+clubId))
            dispatch(userActions.getMyClubProfile(+clubId))
        }
    }, [dispatch, clubId])

    useEffect(() => {
        dispatch(userActions.getMyProfile())
    }, [dispatch])

    const data = useData()
    const { schedulingStatus, myId } = data
    const myTimeTable = data.myTimeTable ?? new2dArray(7, 48, false)
    const isAdmin = useSelector(userSelector.isAdmin)

    useEffect(() => {
        if(schedulingStatus) {
            const dayCnt = 'dates' in schedulingStatus
                ? schedulingStatus.dates.length
                : schedulingStatus.weekdays.filter((v) => v).length
            const mySchedulingInfo = schedulingStatus.availableTime.filter(time => time.user.id === myId )
            if(mySchedulingInfo.length) {
                setSelected(mySchedulingInfo[0].time)
            }
            else {
                setSelected(new2dArray(dayCnt, schedulingStatus.endTime - schedulingStatus.startTime, false))
            }

        }
    }, [schedulingStatus, myId])
    if (!schedulingStatus) {return null}

    if('dates' in schedulingStatus) {
        header = schedulingStatus.dates.map(date => {
            const d = new Date(date)
            return `${d.getMonth() + 1}/${d.getDate()}`
        })
        fixed = schedulingStatus.dates.map(date => (
            myTimeTable[getDay(new Date(date))].slice(schedulingStatus.startTime, schedulingStatus.endTime)),
        )
    }
    else {
        header = ['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN'].filter((_, idx) => schedulingStatus.weekdays[idx])
        fixed = myTimeTable.filter((_, idx) => schedulingStatus.weekdays[idx]).map(
            x => x.slice(schedulingStatus.startTime, schedulingStatus.endTime),
        )
    }

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
            startTime={schedulingStatus.startTime}
            selected={selected}
            gray={fixed}
            setSelected={setSelected as (f: ((x: boolean[][]) => boolean[][])) => void}
            selectColor={UdongColors.Primary50}
        />}
        <HStack
            justifyContent={'space-around'}
            width={'100%'}
        >
            <UdongButton
                style={'fill'}
                onClick={() => router.push(`/club/${clubId}/post/${postId}/status`)}
            >
                현황 보기
            </UdongButton>

            {!schedulingStatus.closed && <UdongButton
                style={'fill'}
                onClick={() => {
                    if(selected) {
                        dispatch(schedulingActions.participateInScheduling({ postId, time: selected }))
                        toast.success('제출되었습니다')
                    }
                }}
            >
                일정 제출하기
            </UdongButton>}
        </HStack>
        {isAdmin && !schedulingStatus.closed && <UdongButton
            style={'line'}
            onClick={() => router.push(`/club/${clubId}/post/${postId}/close`)}
        >
            마감하기
        </UdongButton>}
    </VStack>
}

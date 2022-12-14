import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { SchedulingPostType } from '../../../../../domain/model/SchedulingPostType'
import { AppDispatch } from '../../../../../domain/store'
import { eventSelector } from '../../../../../domain/store/event/EventSelector'
import { deleteEvent, eventActions } from '../../../../../domain/store/event/EventSlice'
import { postSelector } from '../../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../../domain/store/post/PostSlice'
import { userSelector } from '../../../../../domain/store/user/UserSelector'
import { timeToStr } from '../../../../../utility/functions'
import { convertQueryParamToString } from '../../../../../utility/handleQueryParams'
import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DeleteModal } from '../../../shared/DeleteModal'
import { PostItem } from '../../../shared/PostItem'
import { ScrollToTopButton } from '../../../shared/ScrollToTopButton'

export const EventDetailContainer = () => {
    const router = useRouter()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { clubId: rawClubId, eventId: rawEventId } = router.query
    const eventId = parseInt(convertQueryParamToString(rawEventId))
    const clubId = parseInt(convertQueryParamToString(rawClubId))
    const dispatch = useDispatch<AppDispatch>()
    const isAdmin = useSelector(userSelector.isAdmin)

    const event = useSelector(eventSelector.selectedEvent)
    const eventPosts = useSelector(postSelector.eventPosts)

    useEffect(()=>{
        dispatch(eventActions.resetUpserted())
    }, [dispatch])

    useEffect(() => {
        if(eventId) {
            dispatch(eventActions.getEvent(eventId))
            dispatch(postActions.getEventPosts(eventId))
        }
    }, [dispatch, eventId])

    const handleDelete = async () => {
        await dispatch(deleteEvent(eventId))
        toast.success('행사가 삭제되었습니다')
        router.push(`/club/${clubId}`)
    }

    if(!event) {return null}
    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={event.name}
            onGoBack={() => router.back()}
            rightButtons={isAdmin && <>
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={() => {router.push(`/club/${clubId}/event/${eventId}/edit`)}}
                >
                    수정하기
                </UdongButton>

                <Spacer width={15}/>

                <UdongButton
                    style={'line'}
                    color={UdongColors.Warning}
                    height={40}
                    onClick={() => setShowDeleteModal(true)}
                >
                    삭제하기
                </UdongButton>
            </>}
        />
        <Spacer height={45}/>

        <UdongText style={'GeneralTitle'}>행사 시간</UdongText>
        <Spacer height={15}/>
        <VStack paddingHorizontal={16}>
            {
                event.times.map(time => (
                    time.type === SchedulingPostType.DATES
                        ? <UdongText style={'GeneralContent'}>
                            {time.startDate} {timeToStr(time.startTime)} ~ {time.endDate} {timeToStr(time.endTime)}
                        </UdongText>
                        : <UdongText style={'GeneralContent'}>
                            {['월', '화', '수', '목', '금', '토', '일'][time.weekday]} {timeToStr(time.startTime)} ~ {timeToStr(time.endTime)}
                            {` (${time.repeatStart} ~ ${time.repeatEnd})`}
                        </UdongText>
                ))
            }
        </VStack>

        <Spacer height={30}/>
        <UdongText style={'GeneralTitle'}>관련 게시글</UdongText>
        <Spacer height={15}/>
        {eventPosts.map((post, index) => {
            return <PostItem
                key={post.id + index}
                post={post}
                clubId={clubId}
            />
        })}

        <ScrollToTopButton/>

        <DeleteModal
            deleteObjectText={'행사'}
            warningText={`행사 ${event.name}이(가) 영구적으로 삭제됩니다.`}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
            onClickDelete={handleDelete}
        />
    </VStack>
}

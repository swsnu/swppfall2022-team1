import { useRouter } from 'next/router'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { SchedulingPostType } from '../../../../../domain/model/SchedulingPostType'
import { Time } from '../../../../../domain/model/Time'
import { AppDispatch } from '../../../../../domain/store'
import { clubActions } from '../../../../../domain/store/club/ClubSlice'
import { eventActions } from '../../../../../domain/store/event/EventSlice'
import { postSelector } from '../../../../../domain/store/post/PostSelector'
import { schedulingSelector } from '../../../../../domain/store/post/scheduling/SchedulingSelector'
import { convertQueryParamToString } from '../../../../../utility/handleQueryParams'
import { VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongCheckbox } from '../../../../components/UdongCheckbox'
import { UdongCloseButton } from '../../../../components/UdongCloseButton'
import { UdongModal } from '../../../../components/UdongModal'
import { UdongText } from '../../../../components/UdongText'
import { UdongTextField } from '../../../../components/UdongTextField'
import { UdongColors } from '../../../../theme/ColorPalette'

interface UdongModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selected: boolean[][]
  inc: number[]
}

export const SchedulingCloseModal = (props: UdongModalProps) => {
    const { isOpen, setIsOpen, inc, selected } = props
    const router = useRouter()
    const { clubId: rawClubId, postId } = router.query
    const clubId = convertQueryParamToString(rawClubId)

    const [createTag, setCreateTag] = useState<boolean>(false)
    const [saveTime, setSaveTime] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement | undefined>(null)
    const [tagName, setTagName] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()
    const post = useSelector(postSelector.selectedPost)
    const schedulingStatus = useSelector(schedulingSelector.schedulingStatus)

    const buttonDisable = useMemo(() => createTag && !tagName, [createTag, tagName])

    const handleClose = useCallback(() => {
        if(!buttonDisable && schedulingStatus && post) {
            if(createTag) { dispatch(clubActions.createClubTag({ clubId: +clubId, tagName, userIds: inc })) }
            if(saveTime && post.eventId) {
                const dayInfos = 'dates' in schedulingStatus ?
                    schedulingStatus.dates.map(x => ({
                        type: SchedulingPostType.DATES,
                        startDate: x,
                        endDate: x,
                    }))
                    : schedulingStatus.weekdays.map((x, i) => (x ? ({
                        type: SchedulingPostType.DAYS,
                        repeatStart: schedulingStatus.repeatStart,
                        repeatEnd: schedulingStatus.repeatEnd,
                        weekday: '0'.repeat(i) + '1' + '0'.repeat(6 - i),
                    }) : null)).filter(x => x)
                const eventTimes = selected.map((dayData: boolean[], dayIdx) => {
                    const res: Time[] = []
                    let startIdx = -1
                    dayData.forEach((x, i) => {
                        if(x && startIdx < 0) {
                            startIdx = i
                        }
                        else if(!x && startIdx >= 0) {
                            res.push({
                                startTime: startIdx + schedulingStatus.startTime,
                                endTime: i + schedulingStatus.startTime,
                                ...dayInfos[dayIdx],
                            } as Time)
                            startIdx = -1
                        }
                    })
                    if(startIdx >= 0) {
                        res.push({
                            startTime: startIdx + schedulingStatus.startTime,
                            endTime: schedulingStatus.endTime,
                            ...dayInfos[dayIdx],
                        } as Time)
                    }
                    return res
                }).reduce((x, y) => x.concat(y), [])
                dispatch(eventActions.editEvent({ eventId: post.eventId, name: null, time: eventTimes }))
            }
            router.push(`/club/${clubId}/post/${postId}`)
        }
    }, [router, clubId, postId, createTag, dispatch, saveTime, buttonDisable, tagName, inc, post, schedulingStatus, selected])

    return (
        <UdongModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <UdongCloseButton setIsOpen={setIsOpen}/>
            <VStack
                alignItems={'start'}
                width={'100%'}
                paddingHorizontal={50}
                gap={10}
                style={{ paddingBottom: 30 }}
            >
                <UdongText style={'GeneralTitle'}>일정 수합 마감</UdongText>
                <UdongCheckbox
                    text={'지원한 인원으로 태그 만들기'}
                    checked={createTag}
                    onChange={setCreateTag}
                />
                {createTag &&
                    <UdongTextField
                        placeholder={'생성할 태그의 이름을 입력하세요'}
                        inputRef={inputRef}
                        defaultValue={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                    />
                }
                {post?.eventId && <>
                    <UdongCheckbox
                        text={'선택한 시간을 행사 시간으로 설정하기'}
                        checked={saveTime}
                        onChange={setSaveTime}
                    />
                    <UdongText
                        style={'ListContentXS'}
                        marginLeft={30}
                        marginTop={-10}
                    >
                        ※ 기존 행사 시간은 삭제됩니다.
                    </UdongText>
                </>}
                <UdongButton
                    color={buttonDisable ? UdongColors.GrayNormal : UdongColors.Primary}
                    disabled={buttonDisable}
                    style={'line'}
                    alignSelf={'center'}
                    onClick={handleClose}
                    paddingTop={10}
                >마감하기</UdongButton>
            </VStack>
        </UdongModal>
    )
}

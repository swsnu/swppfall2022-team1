import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../../../domain/store'
import { eventSelector } from '../../../../../../domain/store/event/EventSelector'
import { eventActions } from '../../../../../../domain/store/event/EventSlice'
import {
    checkDayTimesValid,
    checkWeekdayTimesValid,
    toDayTimeFormatter,
    toWeekdayTimeFormatter,
} from '../../../../../../utility/eventDateUtils'
import { convertQueryParamToString } from '../../../../../../utility/handleQueryParams'
import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { DateRangeType } from '../../../../shared/DateRangePicker'
import { EventAdditionalFieldsView } from '../EventAdditionalFieldsView'
import { DayTimeWithIdType } from '../EventDateSchedule'
import { WeekdayTimeWithIdType } from '../EventDaySchedule'
import { EventInputView } from '../EventInputView'

export type EventTimeType = 'days' | 'dates' | 'notAssigned'

export const EventCreateContainer = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const error = useSelector(eventSelector.errors).createEventError
    const upsertedEventId = useSelector(eventSelector.upsertedEventId)
    const [disabled, setDisabled] = useState(false)
    const [title, setTitle] = useState<string>('')
    const { clubId: rawClubId } = router.query
    const clubId = convertQueryParamToString(rawClubId)
    const [eventTimeType, setEventTimeType] = useState<EventTimeType>('notAssigned')
    const [weekdayRange, setWeekdayRange] = useState<DateRangeType>({ start: '', end: '' })
    const [weekdayTimesWithId, setWeekdayTimesWithId] = useState<Array<WeekdayTimeWithIdType>>([{
        id: 0,
        day: '',
        time: { start: '', end: '' } }])
    const [dayTimesWithId, setDayTimesWithId] = useState<DayTimeWithIdType[]>([{
        id: 0,
        start: { date: '', time: '' },
        end: { date: '', time: '' } }])

    useEffect(()=>{
        if (error){
            toast.dismiss()
            toast.error(error.message)
            setDisabled(false)
            dispatch(eventActions.resetErrors())
        }
    }, [dispatch, error])

    useEffect(()=>{
        if (upsertedEventId){
            toast.dismiss()
            toast.success('저장되었습니다.', { duration: 2000 })
            router.push(`/club/${clubId}/event/${upsertedEventId}`)
        }
    }, [clubId, router, upsertedEventId])

    const handleCreateEvent = useCallback(() => {
        setDisabled(true)
        const eventObject = { clubId: parseInt(clubId), name: title }
        if (title.length === 0){
            toast.error('행사 이름을 입력해주세요')
            setDisabled(false)
            return
        }
        if (eventTimeType === 'notAssigned'){
            toast.loading('저장중입니다.')
            dispatch(eventActions.createEvent({ ...eventObject, time: [] }))
        } else if (eventTimeType === 'days'){
            if (checkWeekdayTimesValid(weekdayTimesWithId)){
                toast.loading('저장중입니다.')
                dispatch(eventActions.createEvent({
                    ...eventObject,
                    time: weekdayTimesWithId.map((weekdayTimeWithId)=>toWeekdayTimeFormatter(weekdayTimeWithId, weekdayRange)) }))
            } else {
                toast.error('시간을 올바르게 입력해주세요.')
                setDisabled(false)
            }
        } else {
            if (checkDayTimesValid(dayTimesWithId)){
                toast.loading('저장중입니다.')
                dispatch(eventActions.createEvent({ ...eventObject, time: dayTimesWithId.map(toDayTimeFormatter) }))
            } else {
                toast.error('기간을 올바르게 입력해주세요.')
                setDisabled(false)
            }
        }
    }, [clubId, dispatch, title, weekdayTimesWithId, weekdayRange, dayTimesWithId, eventTimeType])

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'행사 만들기'}
            onGoBack={() => router.back()}
            rightButtons={
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={handleCreateEvent}
                    disabled={disabled}
                >
                    저장하기
                </UdongButton>
            }
        />
        <EventInputView
            title={title}
            setTitle={setTitle}
        />
        <EventAdditionalFieldsView
            weekdayRange={weekdayRange}
            setWeekdayRange={setWeekdayRange}
            weekdayTimesWithId={weekdayTimesWithId}
            setWeekdayTimesWithId={setWeekdayTimesWithId}
            dayTimesWithId={dayTimesWithId}
            setDayTimesWithId={setDayTimesWithId}
            eventTimeType={eventTimeType}
            setEventTimeType={setEventTimeType}
        />
    </VStack>
}

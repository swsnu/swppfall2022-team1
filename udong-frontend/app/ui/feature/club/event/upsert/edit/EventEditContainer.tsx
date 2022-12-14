import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { ClubEvent } from '../../../../../../domain/model/ClubEvent'
import { SchedulingPostType } from '../../../../../../domain/model/SchedulingPostType'
import { DayTime, WeekdayTime } from '../../../../../../domain/model/Time'
import { AppDispatch } from '../../../../../../domain/store'
import { eventSelector } from '../../../../../../domain/store/event/EventSelector'
import { eventActions } from '../../../../../../domain/store/event/EventSlice'
import {
    checkDayTimesValid,
    checkWeekdayTimesValid,
    toDayTimeFormatter,
    toDayTimeWithIdFormatter,
    toWeekdayRangeFormatter,
    toWeekdayTimeFormatter,
    toWeekdayTimeWithIdFormatter,
} from '../../../../../../utility/eventDateUtils'
import { convertQueryParamToString } from '../../../../../../utility/handleQueryParams'
import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { DateRangeType } from '../../../../shared/DateRangePicker'
import { EventTimeType } from '../create/EventCreateContainer'
import { EventAdditionalFieldsView } from '../EventAdditionalFieldsView'
import { DayTimeWithIdType } from '../EventDateSchedule'
import { WeekdayTimeWithIdType } from '../EventDaySchedule'
import { EventInputView } from '../EventInputView'

export const EventEditContainer = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { clubId: rawCLubId, eventId: rawEventId } = router.query
    const eventId = parseInt(convertQueryParamToString(rawEventId))
    const event: ClubEvent|undefined = useSelector(eventSelector.selectedEvent)
    const clubId = parseInt(convertQueryParamToString(rawCLubId))
    const error = useSelector(eventSelector.errors).createEventError
    const upsertedEventId = useSelector(eventSelector.upsertedEventId)
    const [disabled, setDisabled] = useState(false)
    const [title, setTitle] = useState('')
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
            toast.success('?????????????????????.', { duration: 2000 })
            router.push(`/club/${clubId}/event/${upsertedEventId}`)
        }
    }, [clubId, router, upsertedEventId])

    useEffect(()=>{
        if (eventId){
            dispatch(eventActions.getEvent(eventId))
        }
    }, [dispatch, eventId])

    useEffect(()=>{
        if (event){
            setTitle(event.name)
            if (event.times.length > 0){
                if (event.times[0].type === SchedulingPostType.DAYS){
                    setEventTimeType('days')
                    setWeekdayTimesWithId(event.times.map((time, i)=>toWeekdayTimeWithIdFormatter(i, time as WeekdayTime)))
                    setWeekdayRange(toWeekdayRangeFormatter(event.times[0]))
                } else {
                    setEventTimeType('dates')
                    setDayTimesWithId(event.times.map((time, i)=>toDayTimeWithIdFormatter(i, time as DayTime)))
                }
            }else{
                setEventTimeType('notAssigned')
            }
        }
    }, [event])

    const handleEditEvent = useCallback(() => {
        setDisabled(true)
        if (!event){
            toast.error('????????? ??????????????????')
            setDisabled(false)
            return
        }
        if (title.length === 0){
            toast.error('?????? ????????? ??????????????????')
            setDisabled(false)
            return
        }
        if (eventTimeType === 'notAssigned'){
            toast.loading('??????????????????.')
            dispatch(eventActions.editEvent({ eventId: event.id, name: title, time: [] } ))
        } else if (eventTimeType === 'days'){
            if (checkWeekdayTimesValid(weekdayTimesWithId)){
                toast.loading('??????????????????.')
                dispatch(eventActions.editEvent({
                    eventId: event.id,
                    name: title,
                    time: weekdayTimesWithId.map((weekdayTimeWithId)=>toWeekdayTimeFormatter(weekdayTimeWithId, weekdayRange)) }))
            } else {
                toast.error('????????? ???????????? ??????????????????.')
                setDisabled(false)
            }
        } else {
            if (checkDayTimesValid(dayTimesWithId)){
                toast.loading('??????????????????.')
                dispatch(eventActions.editEvent({
                    eventId: event.id,
                    name: title,
                    time: dayTimesWithId.map(toDayTimeFormatter) }))
            } else {
                toast.error('????????? ???????????? ??????????????????.')
                setDisabled(false)
            }
        }
    }, [dispatch, title, event, weekdayTimesWithId, weekdayRange, dayTimesWithId, eventTimeType])

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'?????? ????????????'}
            onGoBack={() => router.back()}
            rightButtons={
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={handleEditEvent}
                    disabled={disabled}
                >
                    ????????????
                </UdongButton>
            }
        />
        <EventInputView
            title={title}
            setTitle={setTitle}
        />
        <EventAdditionalFieldsView
            eventTimeType={eventTimeType}
            setEventTimeType={setEventTimeType}
            weekdayRange={weekdayRange}
            setWeekdayRange={setWeekdayRange}
            weekdayTimesWithId={weekdayTimesWithId}
            setWeekdayTimesWithId={setWeekdayTimesWithId}
            dayTimesWithId={dayTimesWithId}
            setDayTimesWithId={setDayTimesWithId}
        />
    </VStack>}

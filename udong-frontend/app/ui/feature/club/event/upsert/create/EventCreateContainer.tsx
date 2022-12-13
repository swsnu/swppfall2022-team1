import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../../../../domain/store'
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

    const handleCreateEvent = useCallback(() => {
        const eventObject = { clubId: parseInt(clubId), name: title }
        if (eventTimeType === 'notAssigned'){
            dispatch(eventActions.createEvent({ ...eventObject, time: [] }))
        } else if (eventTimeType === 'days'){
            if (checkWeekdayTimesValid(weekdayTimesWithId)){
                dispatch(eventActions.createEvent({
                    ...eventObject,
                    time: weekdayTimesWithId.map((weekdayTimeWithId)=>toWeekdayTimeFormatter(weekdayTimeWithId, weekdayRange)) }))
            } else {
                toast.error('시간이 겹치거나 연결됩니다.')
            }
        } else {
            if (checkDayTimesValid(dayTimesWithId)){
                dispatch(eventActions.createEvent({ ...eventObject, time: dayTimesWithId.map(toDayTimeFormatter) }))
            } else {
                toast.error('기간이 겹치거나 연결됩니다.')
            }
        }
    }, [clubId, dispatch, title, weekdayTimesWithId, dayTimesWithId, eventTimeType])

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

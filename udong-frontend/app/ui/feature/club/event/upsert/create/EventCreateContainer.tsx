import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { WeekdayTime } from '../../../../../../domain/model/Time'
import { AppDispatch } from '../../../../../../domain/store'
import { eventActions } from '../../../../../../domain/store/event/EventSlice'
import { checkDateTimesValid, toDayTimeFormatter } from '../../../../../../utility/eventDateUtils'
import { convertQueryParamToString } from '../../../../../../utility/handleQueryParams'
import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { EventAdditionalFieldsView } from '../EventAdditionalFieldsView'
import { dayTimeWithIdType } from '../EventDateSchedule'
import { EventInputView } from '../EventInputView'

export type EventTimeType = 'days' | 'dates' | 'notAssigned'

export const EventCreateContainer = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const [title, setTitle] = useState<string>('')
    const { clubId: rawClubId } = router.query
    const clubId = convertQueryParamToString(rawClubId)
    const [eventTimeType, setEventTimeType] = useState<EventTimeType>('notAssigned')
    const [weekdayTimesWithId, setWeekdayTimesWithId] = useState<Array<WeekdayTime>>([])
    const [dayTimesWithId, setDayTimesWithId] = useState<dayTimeWithIdType[]>([])

    const handleCreateEvent = useCallback(() => {
        const eventObject = { clubId: parseInt(clubId), name: title }
        if (eventTimeType === 'notAssigned'){
            dispatch(eventActions.createEvent({ ...eventObject, times: [] }))
        } else if (eventTimeType === 'days'){
            dispatch(eventActions.createEvent({ ...eventObject, times: weekdayTimesWithId.map(toWeek) }))
        } else {
            if (checkDateTimesValid(dayTimesWithId)){
                dispatch(eventActions.createEvent({ ...eventObject, times: dayTimesWithId.map(toDayTimeFormatter) }))
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
            dayTimesWithId={dayTimesWithId}
            setdayTimesWithId={setdayTimesWithId}
            eventTimeType={eventTimeType}
            setEventTimeType={setEventTimeType}
        />
    </VStack>
}

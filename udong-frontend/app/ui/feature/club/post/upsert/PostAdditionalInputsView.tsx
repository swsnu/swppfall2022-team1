import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CreateScheduling } from '../../../../../domain/model/CreatePost'
import { SchedulingPostType } from '../../../../../domain/model/SchedulingPostType'
import { AppDispatch } from '../../../../../domain/store'
import { eventSelector } from '../../../../../domain/store/event/EventSelector'
import { eventActions } from '../../../../../domain/store/event/EventSlice'
import { tagSelector } from '../../../../../domain/store/tag/TagSelector'
import { tagActions } from '../../../../../domain/store/tag/TagSlice'
import { userSelector } from '../../../../../domain/store/user/UserSelector'
import { DateTimeFormatter } from '../../../../../utility/dateTimeFormatter'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongChip } from '../../../../components/UdongChip'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongRadioButton } from '../../../../components/UdongRadioButton'
import { UdongText } from '../../../../components/UdongText'
import add from '../../../../icons/IcPlus.png'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DateRangeType } from '../../../shared/DateRangePicker'
import { TimeRangeType } from '../../../shared/TimeRangePicker'
import { AdditionalInputItem } from './AdditionalInputItem'
import { EventListModal } from './EventListModal'
import { DateRangeTypeWithId, PostDateSchedule } from './PostDateSchedule'
import { DAYS, PostDaySchedule } from './PostDaySchedule'
import { TagListModal } from './TagListModal'

interface PostAdditionalFieldsViewProps {
    clubId: number
    setScheduling: (scheduling: CreateScheduling) => void
    isEdit: boolean
    showDateTimePicker?: boolean
}

export const PostAdditionalInputsView = (props: PostAdditionalFieldsViewProps) => {
    const { clubId, setScheduling, isEdit, showDateTimePicker } = props
    const dispatch = useDispatch<AppDispatch>()

    const userMe = useSelector(userSelector.userMe)
    const tags = useSelector(tagSelector.tags)
    const events = useSelector(eventSelector.events)
    const selectedTags = useSelector(tagSelector.createPostTags)
    const selectedEvent = useSelector(eventSelector.createPostEvent)

    const [schedulingTimeType, setSchedulingTimeType] = useState<SchedulingPostType>(SchedulingPostType.DAYS)
    const [timeRange, setTimeRange] = useState<TimeRangeType>(isEdit ? { start: '16:30', end: '18:00' } : { start: '', end: '' })
    const [weekdays, setWeekdays] = useState<DAYS[]>(isEdit ? [DAYS.MONDAY, DAYS.THURSDAY] : [])
    const [dateRange, setDateRange] = useState<DateRangeType>(isEdit ? { start: '2022-11-01', end: '2022-11-10' } : { start: '', end: '' })
    const [dates, setDates] = useState<DateRangeTypeWithId[]>(isEdit ? [{ id: 0, start: '2022-11-04', end: '2022-11-05' },
        { id: 1, start: '2022-11-06', end: '2022-11-08' }] : [{ id: 0, start: '', end: '' }])

    const [isTagListModalOpen, setIsTagListModalOpen] = useState(false)
    const [isEventListModalOpen, setIsEventListModalOpen] = useState(false)

    useEffect(() => {
        const scheduling: CreateScheduling = {
            type: schedulingTimeType,
            startTime: DateTimeFormatter.parseTimeTableTime(timeRange.start),
            endTime: DateTimeFormatter.parseTimeTableTime(timeRange.end),
            weekdays: schedulingTimeType === SchedulingPostType.DAYS ? DateTimeFormatter.parseWeekdays(weekdays) : undefined,
            repeatStart: dateRange.start !== '' ? new Date(dateRange.start).toLocaleDateString('en-CA') : undefined,
            repeatEnd: dateRange.end !== '' ? new Date(dateRange.end).toLocaleDateString('en-CA') : undefined,
            dates: DateTimeFormatter.parseDateRanges(dates),
        }
        setScheduling(scheduling)
    }, [schedulingTimeType, timeRange, dates, dateRange, weekdays]) // eslint-disable-line

    const handleAddTag = useCallback(() => {
        setIsTagListModalOpen(true)
        dispatch(tagActions.getTags(clubId))
    }, [dispatch, clubId])

    const handleAddEvent = useCallback(() => {
        setIsEventListModalOpen(true)
        dispatch(eventActions.getEvents(clubId))
    }, [dispatch, clubId])

    return <VStack>
        <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            paddingVertical={12}
        >
            <HStack alignItems={'center'}>
                <UdongText style={'GeneralTitle'}>??????</UdongText>
                <Spacer width={70}/>
                {selectedEvent && <AdditionalInputItem
                    item={<UdongText style={'ListContentUnderscore'}>{selectedEvent.name}</UdongText>}
                    onRemove={() => {dispatch(eventActions.setCreatePostEvent(undefined))}}
                />}
            </HStack>

            <VStack
                onClick={handleAddEvent}
                style={{ padding: '7px 0 7px 10px' }}
            >
                <UdongImage
                    src={add.src}
                    height={15}
                    width={15}
                />
            </VStack>
        </HStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            paddingVertical={12}
        >
            <HStack>
                <UdongText style={'GeneralTitle'}>??????</UdongText>
                <Spacer width={70}/>
                {selectedTags.map((tag, index) => {
                    return <AdditionalInputItem
                        key={tag.id + index}
                        item={
                            <UdongChip
                                color={tag.users.some(user => user.id === userMe?.id) ? UdongColors.Primary : UdongColors.GrayNormal}
                                style={'fill'}
                                text={tag.name}
                            />}
                        onRemove={() => dispatch(tagActions.toggleCreatePostTagSelection(tag))}
                    />
                })}
            </HStack>

            <VStack
                onClick={handleAddTag}
                style={{ padding: '7px 0 7px 10px' }}
            >
                <UdongImage
                    src={add.src}
                    height={15}
                    width={15}
                />
            </VStack>
        </HStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        {showDateTimePicker &&
            <VStack>
                <HStack
                    alignItems={'center'}
                    justifyContent={'start'}
                    paddingVertical={12}
                >
                    <UdongText style={'GeneralTitle'}>?????? ??????</UdongText>
                    <Spacer width={30}/>
                    <UdongRadioButton
                        text={'??????'}
                        checked={schedulingTimeType === SchedulingPostType.DAYS}
                        onCheck={() => {
                            if (!isEdit){
                                setSchedulingTimeType(SchedulingPostType.DAYS)
                            }
                        }}
                        disabled={isEdit}
                    />
                    <Spacer width={30}/>
                    <UdongRadioButton
                        text={'??????'}
                        checked={schedulingTimeType === SchedulingPostType.DATES}
                        onCheck={() => {
                            if (!isEdit){
                                setSchedulingTimeType(SchedulingPostType.DATES)}
                        }}
                        disabled={isEdit}
                    />
                </HStack>
                <Spacer height={30}/>
                {schedulingTimeType === SchedulingPostType.DAYS ?
                    <PostDaySchedule
                        isEdit={isEdit}
                        time={timeRange}
                        setTime={setTimeRange}
                        days={weekdays}
                        setDays={setWeekdays}
                        date={dateRange}
                        setDate={setDateRange}
                    />
                    :
                    <PostDateSchedule
                        isEdit={isEdit}
                        time={timeRange}
                        setTime={setTimeRange}
                        dates={dates}
                        setDates={setDates}
                    />
                }
                <Spacer height={20}/>
            </VStack>
        }

        <TagListModal
            isOpen={isTagListModalOpen}
            setIsOpen={setIsTagListModalOpen}
            tags={tags}
        />
        <EventListModal
            isOpen={isEventListModalOpen}
            setIsOpen={setIsEventListModalOpen}
            events={events}
        />
    </VStack>
}

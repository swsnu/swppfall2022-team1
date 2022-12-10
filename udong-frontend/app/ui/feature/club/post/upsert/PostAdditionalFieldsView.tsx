import React, { useEffect, useState } from 'react'

import { CreateScheduling } from '../../../../../domain/model/CreatePost'
import { SchedulingPostType } from '../../../../../domain/model/SchedulingPostType'
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
import { AdditionalFieldItem } from './AdditionalFieldItem'
import { DateRangeTypeWithId, PostDateSchedule } from './PostDateSchedule'
import { DAYS, PostDaySchedule } from './PostDaySchedule'

interface PostAdditionalFieldsViewProps {
    setScheduling: (scheduling: CreateScheduling) => void
    isEdit: boolean
    showDateTimePicker?: boolean
}

export const PostAdditionalFieldsView = (props: PostAdditionalFieldsViewProps) => {
    const { setScheduling, isEdit, showDateTimePicker } = props

    const [schedulingTimeType, setSchedulingTimeType] = useState<SchedulingPostType>(SchedulingPostType.DAYS)

    const [timeRange, setTimeRange] = useState<TimeRangeType>(isEdit ? { start: '16:30', end: '18:00' } : { start: '', end: '' })

    const [weekdays, setWeekdays] = useState<DAYS[]>(isEdit ? [DAYS.MONDAY, DAYS.THURSDAY] : [])
    const [dateRange, setDateRange] = useState<DateRangeType>(isEdit ? { start: '2022-11-01', end: '2022-11-10' } : { start: '', end: '' })

    const [dates, setDates] = useState<DateRangeTypeWithId[]>(isEdit ? [{ id: 0, start: '2022-11-04', end: '2022-11-05' },
        { id: 1, start: '2022-11-06', end: '2022-11-08' }] : [{ id: 0, start: '', end: '' }])

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

    return <VStack>
        <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            paddingVertical={12}
        >
            <HStack alignItems={'center'}>
                <UdongText style={'GeneralTitle'}>행사</UdongText>
                <Spacer width={70}/>
                {[].map((item, index) => {
                    return <AdditionalFieldItem
                        key={item + index}
                        item={<UdongText style={'ListContentUnderscore'}>교촌 허니콤보 먹고 싶다</UdongText>}
                    />
                })}
            </HStack>
            <UdongImage
                src={add.src}
                height={15}
                width={15}
            />
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
                <UdongText style={'GeneralTitle'}>태그</UdongText>
                <Spacer width={70}/>
                {[].map((item, index) => {
                    return <AdditionalFieldItem
                        key={item + index}
                        item={<UdongChip
                            color={UdongColors.Primary}
                            style={'fill'}
                            text={'전체'}
                        />}
                    />
                })}
            </HStack>
            <UdongImage
                src={add.src}
                height={15}
                width={15}
            />
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
                    <UdongText style={'GeneralTitle'}>일정 수합</UdongText>
                    <Spacer width={30}/>
                    <UdongRadioButton
                        text={'요일'}
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
                        text={'날짜'}
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
    </VStack>
}

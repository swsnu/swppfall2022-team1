import React, { Dispatch, SetStateAction } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'
import { DateRangePicker, DateRangeType } from '../../../shared/DateRangePicker'
import { DayPicker, DAYS } from '../../../shared/DayPicker'

import IcPlus from '/app/ui/icons/IcPlus.png'
import IcClose from '/app/ui/icons/IcClose.png'

import { TimeRangePicker, TimeRangeType } from '../../../shared/TimeRangePicker'

export interface WeekdayTimeWithIdType {
    id: number
    day: DAYS | ''
    time: TimeRangeType
}

interface EventDayScheduleProps {
    weekdayRange: DateRangeType
    setWeekdayRange: Dispatch<SetStateAction<DateRangeType>>
    weekdayTimesWithId: Array<WeekdayTimeWithIdType>
    setWeekdayTimesWithId: Dispatch<SetStateAction<Array<WeekdayTimeWithIdType>>>
}

export const EventDaySchedule = ({ weekdayRange, setWeekdayRange, weekdayTimesWithId, setWeekdayTimesWithId }: EventDayScheduleProps) => {

    return <VStack
        paddingHorizontal={120}
        gap={15}
    >
        <HStack>
            <UdongText
                style={'GeneralContent'}
                width={150}
            >반복 기간</UdongText>
            <DateRangePicker
                date={weekdayRange}
                setDate={setWeekdayRange}
            />
        </HStack>
        <HStack>
            <UdongText
                style={'GeneralContent'}
                width={105}
            >요일</UdongText>
            <VStack
                alignItems={'center'}
                gap={14}
            >
                {weekdayTimesWithId.map((dayTime, i) => (
                    <HStack
                        key={dayTime.id}
                        gap={15}
                        alignItems={'center'}
                    >
                        <Spacer width={30}/>
                        <DayPicker
                            selectedDay={dayTime.day}
                            setSelectedDay={
                                (newDay) => {
                                    const newDayTimes = weekdayTimesWithId.map((target) => {
                                        if (target.id === dayTime.id){
                                            return { id: target.id, day: newDay, time: target.time }
                                        } else {
                                            return target
                                        }
                                    })
                                    setWeekdayTimesWithId(newDayTimes)
                                }
                            }
                        />
                        <TimeRangePicker
                            key={dayTime.id}
                            time={dayTime.time}
                            setTime={(newTime) => {
                                const newTimes = weekdayTimesWithId.map((target) => {
                                    if (target.id === dayTime.id){
                                        return { id: target.id, day: target.day, time: newTime }
                                    } else {
                                        return target
                                    }
                                })
                                setWeekdayTimesWithId(newTimes)
                            }}
                        />
                        {i == 0 ?
                            <Spacer width={15}/> :
                            <UdongImage
                                src={IcClose.src}
                                height={15}
                                width={15}
                                onClick={() => {
                                    const newDayTimes = weekdayTimesWithId.filter((target) => (target.id !== dayTime.id))
                                    setWeekdayTimesWithId(newDayTimes)}
                                }
                            />}
                    </HStack>
                ))
                }
                <UdongImage
                    src={IcPlus.src}
                    height={15}
                    width={15}
                    onClick={() => {
                        setWeekdayTimesWithId([...weekdayTimesWithId, {
                            id: weekdayTimesWithId[weekdayTimesWithId.length - 1].id + 1,
                            day: '',
                            time: { start: '', end: '' },
                        }])
                    }}
                />
            </VStack>
        </HStack>
    </VStack>
}


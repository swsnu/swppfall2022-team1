import React, { useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'
import { DateRangePicker, DateRangeType } from '../../../shared/DateRangePicker'
import { DayPicker, DAYS } from '../../../shared/DayPicker'

import IcPlus from '/app/ui/icons/IcPlus.png'
import IcClose from '/app/ui/icons/IcClose.png'

import { TimeRangePicker, TimeRangeType } from '../../../shared/TimeRangePicker'

interface DayTimeType {
    id: number
    day: DAYS | ''
    time: TimeRangeType
}

interface EventDayScheduleProps {
    isEdit: boolean
}

export const EventDaySchedule = ({ isEdit }: EventDayScheduleProps) => {
    const [date, setDate] = useState<DateRangeType>(isEdit ? { start: '2019-03-25', end: '2019-03-26' } : { start: '', end: '' })
    const [dayTimes, setDayTimes] = useState<DayTimeType[]>(isEdit ?
        [{ id: 0, day: '화' as DAYS, time: { start: '03:30', end: '06:00' } }]
        : [{ id: 0, day: '', time: { start: '', end: '' } }])

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
                date={date}
                setDate={setDate}
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
                {dayTimes.map((dayTime, i) => (
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
                                    const newDayTimes = dayTimes.map((target) => {
                                        if (target.id === dayTime.id){
                                            return { id: target.id, day: newDay, time: target.time }
                                        } else {
                                            return target
                                        }
                                    })
                                    setDayTimes(newDayTimes)
                                }
                            }
                        />
                        <TimeRangePicker
                            key={dayTime.id}
                            time={dayTime.time}
                            setTime={(newTime) => {
                                const newTimes = dayTimes.map((target) => {
                                    if (target.id === dayTime.id){
                                        return { id: target.id, day: target.day, time: newTime }
                                    } else {
                                        return target
                                    }
                                })
                                setDayTimes(newTimes)
                            }}
                        />
                        {i == 0 ?
                            <Spacer width={15}/> :
                            <UdongImage
                                src={IcClose.src}
                                height={15}
                                width={15}
                                onClick={() => {
                                    const newDayTimes = dayTimes.filter((target) => (target.id !== dayTime.id))
                                    setDayTimes(newDayTimes)}
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
                        setDayTimes([...dayTimes, { id: dayTimes[dayTimes.length - 1].id + 1, day: '', time: { start: '', end: '' } }])
                    }}
                />
            </VStack>
        </HStack>
    </VStack>
}


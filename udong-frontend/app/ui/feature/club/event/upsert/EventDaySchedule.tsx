import React, { useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'
import DateRangePicker, { DateRangeType } from '../../../shared/DateRangePicker'
import { DayPicker, DAYS } from '../../../shared/DayPicker'

import IcPlus from '/app/ui/icons/IcPlus.png'
import IcClose from '/app/ui/icons/IcClose.png'

import TimeRangePicker, { TimeRangeType } from '../../../shared/TimeRangePicker'

interface EventDaySchedule {
    fixed?: boolean
}

interface DayTimeType {
    id: number
    day: DAYS | ''
    time: TimeRangeType
}

const EventDaySchedule = ({ fixed }: EventDaySchedule) => {
    const [date, setDate] = useState<DateRangeType>({ start: '', end: '' })
    const [dayTimes, setDayTimes] = useState<DayTimeType[]>([{ id: 0, day: '', time: { start: '12:00', end: '20:30' } }])

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
                setDate={setDate}
                fixedDate={fixed ?  { start: '2022-10-20', end: '2022-11-01' } : undefined}
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
                            fixed={fixed}
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
                            fixedTime={fixed ? { start: '11:00', end: '23:00' } : undefined}
                            key={dayTime.id}
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
                        {fixed || i == 0 ?
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
                }{!fixed &&
                <UdongImage
                    src={IcPlus.src}
                    height={15}
                    width={15}
                    onClick={() => {
                        setDayTimes([...dayTimes, { id: dayTimes[dayTimes.length - 1].id + 1, day: '', time: { start: '', end: '' } }])
                    }}
                />}
            </VStack>
        </HStack>
        <p style={{ color: 'white' }}>{date.start}</p>
        {/*<SpecificTimePicker setTime={()=>{}}/>*/}
        {/*<SpecificDatePicker setDate={()=>{}}/>*/}
    </VStack>
}

export default EventDaySchedule


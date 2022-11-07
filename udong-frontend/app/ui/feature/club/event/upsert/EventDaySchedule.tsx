import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import UdongLoader from '../../../../components/UdongLoader'
import { UdongText } from '../../../../components/UdongText'
import { DateRangeType } from '../../../shared/DateRangePicker'
import { DayPicker, DAYS } from '../../../shared/DayPicker'

import IcPlus from '/app/ui/icons/IcPlus.png'
import IcClose from '/app/ui/icons/IcClose.png'

interface EventDaySchedule {
    fixed?: boolean
}

interface DayTimeType {
    id: number
    day?: DAYS
    time: string[]
}

const EventDaySchedule = ({ fixed }: EventDaySchedule) => {
    const [date, setDate] = useState<DateRangeType>({ start: '', end: '' })
    const [dayTimes, setDayTimes] = useState<DayTimeType[]>([{ id: 0, time: ['12:00', '20:30'] }])

    const TimeRangePicker = useMemo(() => dynamic(() => import('../../../shared/TimeRangePicker').then((mod)=>mod.default),
        { ssr: false, loading: () =>
            <UdongLoader width={160}/> }), [])
    const DateRangePicker = useMemo(() => dynamic(() => import('../../../shared/DateRangePicker').then((mod)=>mod.default),
        { ssr: false, loading: () =>
            <UdongLoader width={300}/> }), [])

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
                fixedDate={fixed ? date : undefined}
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
                {dayTimes.map((dayTime) => (
                    <HStack
                        key={dayTime.id}
                        gap={15}
                        alignItems={'center'}
                    >
                        <Spacer width={30}/>
                        <DayPicker
                            fixed={fixed}
                            day={dayTime.day}
                            setDay={
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
                            fixedTime={['11:00', '23:00']}
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
                        {!fixed &&
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
                        setDayTimes([...dayTimes, { id: dayTimes[dayTimes.length - 1].id + 1, time: ['', ''] }])
                    }}
                />}
            </VStack>
        </HStack>
        {/*<SpecificTimePicker setTime={()=>{}}/>*/}
        {/*<SpecificDatePicker setDate={()=>{}}/>*/}
    </VStack>
}

export default EventDaySchedule


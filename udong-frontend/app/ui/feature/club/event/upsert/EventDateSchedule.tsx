import React, { useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'

import IcClose from '/app/ui/icons/IcClose.png'
import IcPlus from '/app/ui/icons/IcPlus.png'

import SpecificDatePicker from '../../../shared/SpecificDatePicker'
import SpecificTimePicker from '../../../shared/SpecificTimePicker'

interface DateTimesType {
    id: number
    start: {
        date: string
        time: string
    }
    end: {
        date: string
        time: string
    }
}

interface EventDateScheduleProps {
    isEdit: boolean
}

export const EventDateSchedule = ({ isEdit }: EventDateScheduleProps) => {
    const [dateTimes, setDateTimes] = useState<DateTimesType[]>([{ id: 0, start: { date: '', time: '' }, end: { date: '', time: '' } }])

    return <VStack
        paddingHorizontal={120}
        gap={15}
    >
        <HStack>
            <UdongText
                style={'GeneralContent'}
                width={120}
            >기간</UdongText>
            <VStack
                gap={15}
                alignItems={'center'}
            >
                {dateTimes.map((dateTime, i) => (
                    <HStack
                        key={dateTime.id}
                        gap={15}
                        alignItems={'center'}
                    >
                        <Spacer width={15}/>
                        <SpecificDatePicker
                            date={dateTime.start.date}
                            setDate={(newDate) => {
                                const newDateTimes = dateTimes.map((target) => {
                                    if (target.id === dateTime.id){
                                        return { ...target, start: { date: newDate, time: target.start.time } }
                                    } else {
                                        return target
                                    }
                                })
                                setDateTimes(newDateTimes)
                            }
                            }
                        />
                        <SpecificTimePicker
                            time={dateTime.start.time}
                            setTime={(newTime) => {
                                const newDateTimes = dateTimes.map((target) => {
                                    if (target.id === dateTime.id){
                                        return { ...target, start: { date: target.start.date, time: newTime } }
                                    } else {
                                        return target
                                    }
                                })
                                setDateTimes(newDateTimes)
                            }
                            }
                        />
                        <UdongText style={'GeneralContent'}>~</UdongText>
                        <SpecificDatePicker
                            date={dateTime.end.date}
                            setDate={(newDate) => {
                                const newDateTimes = dateTimes.map((target) => {
                                    if (target.id === dateTime.id){
                                        return { ...target, end: { date: newDate, time: target.start.time } }
                                    } else {
                                        return target
                                    }
                                })
                                setDateTimes(newDateTimes)
                            }
                            }
                        />
                        <SpecificTimePicker
                            time={dateTime.end.time}
                            setTime={(newTime) => {
                                const newDateTimes = dateTimes.map((target) => {
                                    if (target.id === dateTime.id){
                                        return { ...target, end: { date: target.start.date, time: newTime } }
                                    } else {
                                        return target
                                    }
                                })
                                setDateTimes(newDateTimes)
                            }
                            }
                        />
                        {i == 0 ?
                            <Spacer width={15}/> :
                            <UdongImage
                                src={IcClose.src}
                                height={15}
                                width={15}
                                onClick={() => {
                                    const newDateTimes = dateTimes.filter((target) => (target.id !== dateTime.id))
                                    setDateTimes(newDateTimes)}
                                }
                            />}
                    </HStack>
                ))}
                {
                    <UdongImage
                        src={IcPlus.src}
                        height={15}
                        width={15}
                        onClick={() => {
                            setDateTimes([...dateTimes, { id: dateTimes[dateTimes.length - 1].id + 1,
                                start: { date: '', time: '' }, end: { date: '', time: '' } }])
                        }}
                    />}
            </VStack>
        </HStack>
        <p style={{ color: 'white' }}>{isEdit}</p>
        {/*<SpecificTimePicker setTime={()=>{}}/>*/}
        {/*<SpecificDatePicker setDate={()=>{}}/>*/}
    </VStack>
}

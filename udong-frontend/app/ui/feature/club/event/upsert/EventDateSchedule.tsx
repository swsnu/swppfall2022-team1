import React, { Dispatch, SetStateAction } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'

import IcClose from '/app/ui/icons/IcClose.png'
import IcPlus from '/app/ui/icons/IcPlus.png'

import { SpecificDatePicker } from '../../../shared/SpecificDatePicker'
import { SpecificTimePicker } from '../../../shared/SpecificTimePicker'

export interface DayTimeWithIdType {
    id: number
    start: {
        date: string //YYYY-MM-DD
        time: string //HH:mm
    }
    end: {
        date: string //YYYY-MM-DD
        time: string //HH:mm
    }
}

interface EventDateScheduleProps {
    dayTimesWithId: Array<DayTimeWithIdType>
    setDayTimesWithId: Dispatch<SetStateAction<Array<DayTimeWithIdType>>>
}

export const EventDateSchedule = ({ dayTimesWithId, setDayTimesWithId }: EventDateScheduleProps) => {
    const handleStartDateChange = (id: number, newDate: string) => {
        const newDateTimes = dayTimesWithId.map((target) => {
            if (target.id === id){
                return { ...target, start: { date: newDate, time: target.start.time } }
            } else {
                return target
            }
        })
        setDayTimesWithId(newDateTimes)
    }

    const handleStartTimeChange = (id: number, newTime: string) => {
        const newDateTimes = dayTimesWithId.map((target) => {
            if (target.id === id){
                return { ...target, start: { date: target.start.date, time: newTime } }
            } else {
                return target
            }
        })
        setDayTimesWithId(newDateTimes)
    }

    const handleEndDateChange = (id: number, newDate: string) => {
        const newDateTimes = dayTimesWithId.map((target) => {
            if (target.id === id) {
                return { ...target, end: { date: newDate, time: target.end.time } }
            } else {
                return target
            }
        })
        setDayTimesWithId(newDateTimes)
    }

    const handleEndTimeChange = (id: number, newTime: string) => {
        const newDateTimes = dayTimesWithId.map((target) => {
            if (target.id === id){
                return { ...target, end: { date: target.end.date, time: newTime } }
            } else {
                return target
            }
        })
        setDayTimesWithId(newDateTimes)
    }

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
                {dayTimesWithId.map((dateTime, i) => (
                    <HStack
                        key={dateTime.id}
                        gap={15}
                        alignItems={'center'}
                    >
                        <Spacer width={15}/>
                        <SpecificDatePicker
                            date={dateTime.start.date}
                            setDate={(newDate)=>{
                                handleStartDateChange(dateTime.id, newDate)
                            }}
                        />
                        <SpecificTimePicker
                            time={dateTime.start.time}
                            setTime={(newTime) => {
                                handleStartTimeChange(dateTime.id, newTime)
                            }}
                        />
                        <UdongText style={'GeneralContent'}>~</UdongText>
                        <SpecificDatePicker
                            date={dateTime.end.date}
                            setDate={(newDate) => {handleEndDateChange(dateTime.id, newDate)}}
                        />
                        <SpecificTimePicker
                            time={dateTime.end.time}
                            setTime={(newTime) => {handleEndTimeChange(dateTime.id, newTime)}}
                        />
                        {i == 0 ?
                            <Spacer width={15}/> :
                            <UdongImage
                                src={IcClose.src}
                                height={15}
                                width={15}
                                onClick={() => {
                                    const newDateTimes = dayTimesWithId.filter((target) => (target.id !== dateTime.id))
                                    setDayTimesWithId(newDateTimes)}
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
                            setDayTimesWithId([...dayTimesWithId, { id: dayTimesWithId[dayTimesWithId.length - 1].id + 1,
                                start: { date: '', time: '' }, end: { date: '', time: '' } }])
                        }}
                    />}
            </VStack>
        </HStack>
    </VStack>
}

import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import UdongLoader from '../../../../components/UdongLoader'
import { UdongText } from '../../../../components/UdongText'

import IcClose from '/app/ui/icons/IcClose.png'
import IcPlus from '/app/ui/icons/IcPlus.png'

interface EventDateSchedule {
    fixed?: boolean
}

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

const EventDateSchedule = ({ fixed }: EventDateSchedule) => {
    const [dateTimes, setDateTimes] = useState<DateTimesType[]>([{ id: 0, start: { date: '', time: '' }, end: { date: '', time: '' } }])

    const SpecificTimePicker = useMemo(() => dynamic(() => import('../../../shared/SpecificTimePicker').then((mod)=>mod.default),
        { ssr: false, loading: () =>
            <UdongLoader width={110}/> }), [])
    const SpecificDatePicker = useMemo(() => dynamic(() => import('../../../shared/SpecificDatePicker').then((mod)=>mod.default),
        { ssr: false, loading: () =>
            <UdongLoader width={110}/> }), [])

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
                {dateTimes.map((dateTime) => (
                    <HStack
                        key={dateTime.id}
                        gap={15}
                        alignItems={'center'}
                    >
                        <Spacer width={15}/>
                        <SpecificDatePicker
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
                            fixedDate={fixed ? '2022-10-10' : undefined}
                        />
                        <SpecificTimePicker
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
                            fixedTime={fixed ? '15:30' : undefined}
                        />
                        <UdongText style={'GeneralContent'}>~</UdongText>
                        <SpecificDatePicker
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
                            fixedDate={fixed ? '2022-10-22' : undefined}
                        />
                        <SpecificTimePicker
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
                            fixedTime={fixed ? '12:00' : undefined}
                        />
                        {!fixed &&
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
                {!fixed &&
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
        {/*<SpecificTimePicker setTime={()=>{}}/>*/}
        {/*<SpecificDatePicker setDate={()=>{}}/>*/}
    </VStack>
}

export default EventDateSchedule

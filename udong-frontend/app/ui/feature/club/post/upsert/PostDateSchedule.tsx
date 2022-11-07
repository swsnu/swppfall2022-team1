import React, { useState } from 'react'

import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'

import IcPlus from '/app/ui/icons/IcPlus.png'
import IcClose from '/app/ui/icons/IcClose.png'

import DateRangePicker, { DateRangeType } from '../../../shared/DateRangePicker'
import TimeRangePicker, { TimeRangeType } from '../../../shared/TimeRangePicker'

interface PostDateSchedule {
    fixed?: boolean
}

interface DateRangeTypeWithId extends DateRangeType {
    id: number
}

const PostDateSchedule = ({ fixed }: PostDateSchedule) => {
    const [time, setTime] = useState<TimeRangeType>({ start: '', end: '' })
    const [dates, setDates] = useState<DateRangeTypeWithId[]>([{ id: 0, start: '', end: '' }])

    return <VStack
        paddingHorizontal={120}
        gap={15}
    >
        <HStack>
            <UdongText
                style={'GeneralContent'}
                width={150}
            >시간</UdongText>
            <TimeRangePicker
                setTime={setTime}
                fixedTime={fixed ? time : undefined}
            />
        </HStack>
        <HStack>
            <UdongText
                style={'GeneralContent'}
                width={150}
            >날짜</UdongText>
            <VStack
                gap={15}
                alignItems={'center'}
            >
                {dates.map((date) => (
                    <HStack
                        key={date.id}
                        gap={15}
                        alignItems={'center'}
                    >
                        <DateRangePicker
                            setDate={(newDate) => {
                                const newDates = dates.map((target) => {
                                    if (target.id === date.id){
                                        return { ...newDate, id: target.id }
                                    } else {
                                        return target
                                    }
                                })
                                setDates(newDates)
                            }}
                            fixedDate={fixed ? date : undefined}
                        />
                        <UdongImage
                            src={IcClose.src}
                            height={15}
                            width={15}
                            onClick={() => {
                                const newDates = dates.filter((target) => (target !== date))
                                setDates(newDates)}
                            }
                        />
                    </HStack>
                ))}
                <UdongImage
                    src={IcPlus.src}
                    height={15}
                    width={15}
                    onClick={() => {
                        setDates([...dates, { id: dates[dates.length - 1].id + 1, start: '', end: '' }])
                    }}
                />
            </VStack>
        </HStack>
        {/*<SpecificTimePicker setTime={()=>{}}/>*/}
        {/*<SpecificDatePicker setDate={()=>{}}/>*/}
    </VStack>
}

export default PostDateSchedule

import React, { useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'

import IcPlus from '/app/ui/icons/IcPlus.png'
import IcClose from '/app/ui/icons/IcClose.png'

import DateRangePicker, { DateRangeType } from '../../../shared/DateRangePicker'
import TimeRangePicker, { TimeRangeType } from '../../../shared/TimeRangePicker'

interface PostDateSchedule {
    edit: boolean
}

interface DateRangeTypeWithId extends DateRangeType {
    id: number
}

const PostDateSchedule = ({ edit }: PostDateSchedule) => {
    const [time, setTime] = useState<TimeRangeType>(edit ? { start: '16:30', end: '18:00' } : { start: '', end: '' })
    const [dates, setDates] = useState<DateRangeTypeWithId[]>(edit ? [{ id: 0, start: '2022-11-04', end: '2022-11-05' },
        { id: 1, start: '2022-11-06', end: '2022-11-08' }] : [{ id: 0, start: '', end: '' }])

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
                time={time}
                fixed={edit}
            />
        </HStack>
        <HStack>
            <UdongText
                style={'GeneralContent'}
                width={120}
            >날짜</UdongText>
            <VStack
                gap={15}
                alignItems={'center'}
            >
                {dates.map((date, i) => (
                    <HStack
                        key={date.id}
                        gap={15}
                        alignItems={'center'}
                    >
                        <Spacer width={15}/>
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
                            date={date}
                            fixed={edit}
                        />
                        {edit || i == 0 ?
                            <Spacer width={15} />
                            :
                            <UdongImage
                                src={IcClose.src}
                                height={15}
                                width={15}
                                onClick={() => {
                                    const newDates = dates.filter((target) => (target !== date))
                                    setDates(newDates)}
                                }
                            />}
                    </HStack>
                ))}{
                    !edit &&
                <UdongImage
                    src={IcPlus.src}
                    height={15}
                    width={15}
                    onClick={() => {
                        setDates([...dates, { id: dates[dates.length - 1].id + 1, start: '', end: '' }])
                    }}
                />
                }
            </VStack>
        </HStack>
        {/*<SpecificTimePicker setTime={()=>{}}/>*/}
        {/*<SpecificDatePicker setDate={()=>{}}/>*/}
    </VStack>
}

export default PostDateSchedule

import React from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'

import IcPlus from '/app/ui/icons/IcPlus.png'
import IcClose from '/app/ui/icons/IcClose.png'

import { DateRangePicker, DateRangeType } from '../../../shared/DateRangePicker'
import { TimeRangePicker, TimeRangeType } from '../../../shared/TimeRangePicker'

interface PostDateScheduleProps {
    isEdit: boolean
    time: TimeRangeType
    setTime: (time: TimeRangeType) => void
    dates: DateRangeTypeWithId[]
    setDates: (dates: DateRangeTypeWithId[]) => void
}

export interface DateRangeTypeWithId extends DateRangeType {
    id: number
}

export const PostDateSchedule = (props: PostDateScheduleProps) => {
    const { isEdit, time, setTime, dates, setDates } = props

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
                fixed={isEdit}
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
                            fixed={isEdit}
                        />
                        {isEdit || i == 0 ?
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
                    !isEdit &&
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
    </VStack>
}


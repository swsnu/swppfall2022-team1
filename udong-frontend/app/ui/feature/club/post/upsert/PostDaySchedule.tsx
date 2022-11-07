import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'

import { HStack, VStack } from '../../../../components/Stack'
import UdongLoader from '../../../../components/UdongLoader'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DateRangeType } from '../../../shared/DateRangePicker'
import { TimeRangeType } from '../../../shared/TimeRangePicker'

enum DAYS {
    MONDAY='월',
    TUESDAY='화',
    WEDNESDAY='수',
    THURSDAY='목',
    FRIDAY='금',
    SATURDAY='토',
    SUNDAY='일'
}

interface PostDaySchedule {
    fixed?: boolean
}

const PostDaySchedule = ({ fixed }: PostDaySchedule) => {
    const [time, setTime] = useState<TimeRangeType>({ start: '', end: '' })
    const [day, setDay] = useState<DAYS|null>(null)
    const [date, setDate] = useState<DateRangeType>({ start: '', end: '' })

    const TimeRangePicker = useMemo(() => dynamic(() => import('../../../shared/TimeRangePicker').then((mod)=>mod.default),
        { ssr: false, loading: () =>
            <UdongLoader width={300}/> }), [])
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
            >요일</UdongText>
            <HStack gap={10}>
                {Object.values(DAYS).map((target) => (
                    <DayButton
                        key={target}
                        selected={target === day}
                        onClick={()=>setDay(target)}
                    >
                        <UdongText
                            color={target === day ? UdongColors.White : UdongColors.GrayNormal}
                            style={'GeneralContent'}
                        >
                            {target}
                        </UdongText>
                    </DayButton>
                ))}
            </HStack>
        </HStack>
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
        {/*<SpecificTimePicker setTime={()=>{}}/>*/}
        {/*<SpecificDatePicker setDate={()=>{}}/>*/}
    </VStack>
}

export default PostDaySchedule

const DayButton = styled.div<{ selected: boolean }>`
    border: 1px solid ${(props) => props.selected ? UdongColors.GrayNormal : UdongColors.GrayDark};
    background-color: ${(props) => props.selected ? UdongColors.GrayNormal : UdongColors.White};
    width: 30px;
    height: 30px;
    text-align: center;
    align-items: center;
`

import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'

import { HStack, VStack } from '../../../../components/Stack'
import UdongLoader from '../../../../components/UdongLoader'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DateRangeType } from '../../../shared/DateRangePicker'

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
    const [time, setTime] = useState<string[]>(['', ''])
    const [day, setDay] = useState<DAYS|null>(null)
    const [date, setDate] = useState<DateRangeType>({ start: '', end: '' })

    const TimeRangePicker = useMemo(() => dynamic(() => import('../../../shared/TimeRangePicker').then((mod)=>mod.default),
        { ssr: false, loading: () =>
            <UdongLoader width={300}/> }), [])
    const DateRangePicker = useMemo(() => dynamic(() => import('../../../shared/DateRangePicker').then((mod)=>mod.default),
        { ssr: false, loading: () =>
            <UdongLoader width={300}/> }), [])
    const DayButton = ({ selectedDay, day } : { selectedDay : DAYS|null, day: DAYS }) => {
        return <DayButtonContainer
            selected={selectedDay === day}
            onClick={()=>setDay(day)}
        >
            <UdongText
                color={selectedDay === day ? UdongColors.White : UdongColors.GrayNormal}
                style={'GeneralContent'}
            >
                {day}
            </UdongText>
        </DayButtonContainer>
    }
<<<<<<< HEAD
=======

>>>>>>> 3a53a1d (modulize day button)
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
                <DayButton
                    selectedDay={day}
                    day={DAYS.MONDAY}
                />
                <DayButton
                    selectedDay={day}
                    day={DAYS.TUESDAY}
                />
                <DayButton
                    selectedDay={day}
                    day={DAYS.WEDNESDAY}
                />
                <DayButton
                    selectedDay={day}
                    day={DAYS.THURSDAY}
                />
                <DayButton
                    selectedDay={day}
                    day={DAYS.FRIDAY}
                />
                <DayButton
                    selectedDay={day}
                    day={DAYS.SATURDAY}
                />
                <DayButton
                    selectedDay={day}
                    day={DAYS.SUNDAY}
                />
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

const DayButtonContainer = styled.div<{ selected: boolean }>`
    border: 1px solid ${(props) => props.selected ? UdongColors.GrayNormal : UdongColors.GrayDark};
    background-color: ${(props) => props.selected ? UdongColors.GrayNormal : UdongColors.White};
    width: 30px;
    height: 30px;
    text-align: center;
    align-items: center;
`

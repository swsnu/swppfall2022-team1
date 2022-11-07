import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'

import { HStack, VStack } from '../../../../components/Stack'
import UdongLoader from '../../../../components/UdongLoader'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DateRangeType } from '../../../shared/DateRangePicker'

enum DAYS {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
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
                    selected={day === DAYS.MONDAY}
                    onClick={()=>setDay(DAYS.MONDAY)}
                >
                    <UdongText
                        color={day === DAYS.MONDAY ? UdongColors.White : UdongColors.GrayNormal}
                        style={'GeneralContent'}
                    >
                월
                    </UdongText>
                </DayButton>
                <DayButton
                    selected={day === DAYS.TUESDAY}
                    onClick={()=>setDay(DAYS.TUESDAY)}
                >
                    <UdongText
                        color={day === DAYS.TUESDAY ? UdongColors.White : UdongColors.GrayNormal}
                        style={'GeneralContent'}
                    >
                화
                    </UdongText>
                </DayButton>
                <DayButton
                    selected={day === DAYS.WEDNESDAY}
                    onClick={()=>setDay(DAYS.WEDNESDAY)}
                >
                    <UdongText
                        color={day === DAYS.WEDNESDAY ? UdongColors.White : UdongColors.GrayNormal}
                        style={'GeneralContent'}
                    >
                수
                    </UdongText>
                </DayButton>
                <DayButton
                    selected={day === DAYS.THURSDAY}
                    onClick={()=>setDay(DAYS.THURSDAY)}
                >
                    <UdongText
                        color={day === DAYS.THURSDAY ? UdongColors.White : UdongColors.GrayNormal}
                        style={'GeneralContent'}
                    >
                목
                    </UdongText>
                </DayButton>
                <DayButton
                    selected={day === DAYS.FRIDAY}
                    onClick={()=>setDay(DAYS.FRIDAY)}
                >
                    <UdongText
                        color={day === DAYS.FRIDAY ? UdongColors.White : UdongColors.GrayNormal}
                        style={'GeneralContent'}
                    >
                금
                    </UdongText>
                </DayButton>
                <DayButton
                    selected={day === DAYS.SATURDAY}
                    onClick={()=>setDay(DAYS.SATURDAY)}
                >
                    <UdongText
                        color={day === DAYS.SATURDAY ? UdongColors.White : UdongColors.GrayNormal}
                        style={'GeneralContent'}
                    >
                토
                    </UdongText>
                </DayButton>
                <DayButton
                    selected={day === DAYS.SUNDAY}
                    onClick={()=>setDay(DAYS.SUNDAY)}
                >
                    <UdongText
                        color={day === DAYS.SUNDAY ? UdongColors.White : UdongColors.GrayNormal}
                        style={'GeneralContent'}
                    >
                일
                    </UdongText>
                </DayButton>
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

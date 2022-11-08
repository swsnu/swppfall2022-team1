import styled from '@emotion/styled'
import React, { useState } from 'react'

import { HStack, VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import DateRangePicker, { DateRangeType } from '../../../shared/DateRangePicker'
import TimeRangePicker, { TimeRangeType } from '../../../shared/TimeRangePicker'

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
    isEdit: boolean
}

const PostDaySchedule = ({ isEdit }: PostDaySchedule) => {
    const [time, setTime] = useState<TimeRangeType>(isEdit ? { start: '14:30', end: '16:00' } : { start: '', end: '' })
    const [days, setDays] = useState<DAYS[]>(isEdit ? [DAYS.MONDAY, DAYS.THURSDAY] : [])
    const [date, setDate] = useState<DateRangeType>(isEdit ? { start: '2022-11-01', end: '2022-11-10' } : { start: '', end: '' })

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
                width={150}
            >요일</UdongText>
            <HStack gap={10}>
                {Object.values(DAYS).map((target) => (
                    <DayButton
                        key={target}
                        disabled={isEdit}
                        fixed={isEdit}
                        selected={days.includes(target)}
                        onClick={()=>{
                            const idx = days.indexOf(target)
                            if (idx < 0){
                                setDays([...days, target])
                            } else {
                                const newDays = [...days]
                                newDays.splice(idx, 1)
                                setDays(newDays)
                            }
                        }}
                        style={{ cursor: isEdit ? 'not-allowed' : 'pointer' }}
                    >
                        <UdongText
                            color={!days.includes(target) ? UdongColors.GrayNormal : isEdit ? UdongColors.GrayBright : UdongColors.White}
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
                date={isEdit ? { start: '2022-09-30', end: '2022-10-02' } : date}
                fixed={isEdit}
            />
        </HStack>
        {/*<SpecificTimePicker setTime={()=>{}}/>*/}
        {/*<SpecificDatePicker setDate={()=>{}}/>*/}
    </VStack>
}

export default PostDaySchedule

const DayButton = styled.button<{ selected: boolean, fixed: boolean }>`
    border: 1px solid ${(props) => props.selected ? UdongColors.GrayNormal : UdongColors.GrayDark};
    background-color: ${(props) => props.selected ? UdongColors.GrayNormal : props.fixed ? UdongColors.GrayBright : UdongColors.White};
    width: 30px;
    height: 30px;
    text-align: center;
    align-items: center;
`

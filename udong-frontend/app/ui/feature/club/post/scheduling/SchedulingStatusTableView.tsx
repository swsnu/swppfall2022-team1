import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { DateSchedulingPost } from '../../../../../domain/model/DateSchedulingPost'
import { WeekdaySchedulingPost } from '../../../../../domain/model/WeekdaySchedulingPost'
import { new2dArray } from '../../../../../utility/functions'
import { VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { CellIdx, TimeTable } from '../../../shared/TimeTable'
import { getHeader } from './SchedulingHooks'

interface SchedulingStatusTableViewProps {
    data: DateSchedulingPost | WeekdaySchedulingPost
    selected: CellIdx|null
    setSelected: Dispatch<SetStateAction<CellIdx|null>>
    setHover: (idx: CellIdx | null) => void
    cnt: number[][]
}

export const SchedulingStatusTableView = (props: SchedulingStatusTableViewProps) => {
    const { data, selected, setSelected, setHover, cnt } = props
    const [selectedArray, setSelectedArray] = useState<boolean[][]>(new2dArray(cnt.length, cnt[0].length, false))

    useEffect(() => {
        const v = new2dArray(cnt.length, cnt[0].length, false)
        if(selected){v[selected.col][selected.row] = true}
        setSelectedArray(v)
    }, [selected, cnt])

    if(selected) {selectedArray[selected.col][selected.row] = true}

    const header = useMemo(() => getHeader(data), [data])

    return (
        <VStack
            alignItems={'start'}
            width={'40%'}
        >
            <UdongText style={'GeneralTitle'}>일정 수합 현황</UdongText>
            <UdongText style={'GeneralContent'}>※ 클릭시 해당 시간에 참여 가능한 인원을 보여드립니다.</UdongText>
            <TimeTable
                days={header}
                startTime={data.startTime}
                data={cnt}
                selected={selectedArray}
                selectColor={UdongColors.Primary}
                onHover={setHover}
                onClick={({ col, row }) => {
                    if(selected && col === selected.col && row === selected.row) {
                        setSelected(null)
                    }
                    else {setSelected({ col, row })}
                }}
                style={{ marginTop: 10 }}
            />
        </VStack>
    )
}

import { Dispatch, SetStateAction, useMemo } from 'react'

import { VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { DraggableTimeTable } from '../../../shared/DraggableTimeTable'
import { CellIdx } from '../../../shared/TimeTable'
import { getHeader, SchedulingDataType } from './SchedulingHooks'

interface SchedulingStatusTableViewProps {
    data: SchedulingDataType
    selected: boolean[][]|null
    setSelected: Dispatch<SetStateAction<boolean[][] | null>>
    setHover: (idx: CellIdx | null) => void
    cnt: number[][]
}

export const SchedulingCloseTableView = (props: SchedulingStatusTableViewProps) => {
    const { data, selected, setSelected, setHover, cnt } = props

    const header = useMemo(() => getHeader(data), [data])

    return (
        <VStack
            alignItems={'start'}
            width={'40%'}
        >
            <UdongText style={'GeneralTitle'}>일정 수합 현황</UdongText>
            <UdongText style={'GeneralContent'}>※ 클릭시 해당 시간에 참여 가능한 인원을 보여드립니다.</UdongText>
            {selected !== null && <DraggableTimeTable
                days={header}
                startTime={data.startTime}
                selected={selected}
                setSelected={setSelected as (f: ((x: boolean[][]) => boolean[][])) => void}
                onHover={setHover}
                data={cnt}
                style={{ marginTop: 10 }}
            />}
        </VStack>
    )

}

import { CSSProperties } from 'react'

import { CellIdx, TimeTable } from './TimeTable'

interface DraggableTimeTableProps {
    days: string[]
    startTime: number
    data?: number[][]
    selected: boolean[][]
    setSelected: (f: ((x: boolean[][]) => boolean[][])) => void
    gray?: boolean[][]
    selectColor?: string
    style?: CSSProperties
    onHover?: (idx: CellIdx | null) => void
    onClick?: (idx: CellIdx) => void
}

export const DraggableTimeTable = (props: DraggableTimeTableProps) => {
    const { setSelected, selected, ...otherProps } = props

    const onDrag = (startIdx: CellIdx, endIdx: CellIdx) => setSelected(selected => {
        const newSelected = selected.map(x => x.slice())
        const mnCol = Math.min(startIdx?.col, endIdx?.col)
        const mxCol = Math.max(startIdx?.col, endIdx?.col)
        const mnRow = Math.min(startIdx?.row, endIdx?.row)
        const mxRow = Math.max(startIdx?.row, endIdx?.row)
        const v = !selected[startIdx.col][startIdx.row]
        for(let col = mnCol; col <= mxCol; col++) {
            for(let row = mnRow; row <= mxRow; row++) {
                newSelected[col][row] = v
            }
        }
        return newSelected
    })

    return <TimeTable
        onDrag={onDrag}
        selected={selected}
        {...otherProps}
    />
}

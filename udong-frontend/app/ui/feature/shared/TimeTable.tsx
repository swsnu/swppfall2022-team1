import styled from '@emotion/styled'
import { CSSProperties, MouseEvent, useEffect, useRef, useState } from 'react'

import { HStack, VStack } from '../../components/Stack'
import { UdongColors } from '../../theme/ColorPalette'
import { SlashedBox } from './SlashedBox'

const CELL_WIDTH = 64
const CELL_HEIGHT = 32

export type CellIdx = {
    col: number
    row: number
}

const Cell = styled.div({
    width: CELL_WIDTH,
    verticalAlign: 'middle',
    borderColor: UdongColors.GrayNormal,
    borderStyle: 'solid',
    borderWidth: 0.5,
    userSelect: 'none',
    WebkitUserSelect: 'none',
    cursor: 'default',
})

const HeaderCell = styled(Cell)({
    height: CELL_HEIGHT,
    backgroundColor: UdongColors.SecondaryBright,
    textAlign: 'center',
    lineHeight: 2,
})

const CellBg = styled.div({
    position: 'absolute',
    left: -0.5,
    right: -0.5,
    top: -0.5,
    bottom: -0.5,
    borderColor: UdongColors.GrayNormal,
    borderStyle: 'solid',
    borderWidth: 0.5,
})

const BodyCell = (props: ({
    backgroundColor: string
    backgroundOpacity: number
    isUpper: boolean
    onHover?: () => void
    onClick?: () => void
    onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void
    text: number | null
    gray?: boolean
})) => {
    const { backgroundColor, backgroundOpacity, isUpper, text, gray, onHover, onClick, onMouseDown } = props
    return (
        <Cell
            style={{
                height: CELL_HEIGHT / 2,
                borderColor: 'transparent',
                fontSize: 10,
                paddingLeft: 2,
                position: 'relative',
                color: UdongColors.GrayNormal,
            }}
            onMouseOver={onHover}
            onClick={onClick}
            onMouseDown={onMouseDown}
        >
            <CellBg
                style={{
                    borderTopStyle: isUpper ? 'solid' : 'dashed',
                    borderBottomStyle: isUpper ? 'dashed' : 'solid',
                    zIndex: 30,
                }}
            />
            <CellBg
                style={{
                    backgroundColor,
                    borderColor: 'transparent',
                    opacity: backgroundOpacity,
                    zIndex: 0,
                }}
            />
            {gray && <SlashedBox
                style={{
                    position: 'absolute',
                    left: -0.5,
                    right: -0.5,
                    top: -0.5,
                    bottom: -0.5,
                    zIndex: 10,
                }}
            />}
            <p style={{ margin: 0, zIndex: 30, position: 'relative', cursor: 'default' }} >
                {text === null ? '' : (text % 2 === 0 ? text / 2 : `${(text - 1) / 2}:30`)}
            </p>
        </Cell>
    )
}

interface TimeTableProps {
    days: string[]
    startTime: number
    data?: number[][]
    selected: boolean[][]
    gray?: boolean[][]
    selectColor?: string
    style?: CSSProperties
    onHover?: (idx: CellIdx | null) => void
    onClick?: (idx: CellIdx) => void
    onDrag?: (startIdx: CellIdx, endIdx: CellIdx) => void
}

export const TimeTable = (props: TimeTableProps) => {
    const { days, startTime, data: rawData, selected, gray, selectColor, style, onHover, onClick, onDrag } = props

    const data = rawData ?? selected.map(row => Array(row.length).fill(false))

    const [startCellIdx, setStartCellIdx] = useState<CellIdx|null>(null)
    const [endCellIdx, setEndCellIdx] = useState<CellIdx|null>(null)
    const ref = useRef<HTMLDivElement>(null)

    const maxFn = (arr: number[]) => arr.reduce((a, b) => Math.max(a, b), 0)
    const mxCnt = Math.max(1, maxFn(data.map(colData => maxFn(colData))))

    const calculateInDrag = (cellIdx: CellIdx) => {
        if(onDrag === undefined || !startCellIdx || !endCellIdx) {return false}
        const mnCol = Math.min(startCellIdx?.col, endCellIdx?.col)
        const mxCol = Math.max(startCellIdx?.col, endCellIdx?.col)
        const mnRow = Math.min(startCellIdx?.row, endCellIdx?.row)
        const mxRow = Math.max(startCellIdx?.row, endCellIdx?.row)
        return mnCol <= cellIdx.col  && cellIdx.col <= mxCol && mnRow <= cellIdx.row  && cellIdx.row <= mxRow
    }

    useEffect(() => {
        if(onDrag === undefined) {return}
        const calculateCellIdx = (e: Event): CellIdx|null => {
            if(!ref.current) {return null}
            const rect = ref.current.getBoundingClientRect()
            const endCol = Math.floor(((e as unknown as MouseEvent).clientX - rect.left) / CELL_WIDTH)
            const endRow = Math.floor(((e as unknown as MouseEvent).clientY - rect.top) / (CELL_HEIGHT / 2)) - 2
            return {
                col: Math.min(Math.max(endCol, 0), data.length - 1),
                row: Math.min(Math.max(endRow, 0), data[0].length - 1),
            }
        }

        const mouseUpHandler = (e: Event) => {
            if(onDrag) {
                if(startCellIdx) {
                    const c = calculateCellIdx(e)
                    if(c) {onDrag(startCellIdx, c)}
                }
                setStartCellIdx(null)
            }
        }

        let timeout: ReturnType<typeof setTimeout> | null = null
        const mouseMoveHandler = (e: Event) => {
            if (!timeout) {
                timeout = setTimeout(() => {
                    setEndCellIdx(calculateCellIdx(e))
                    timeout = null
                }, 50)
            }
        }

        document.body.addEventListener('mouseup', mouseUpHandler)
        document.body.addEventListener('mousemove', mouseMoveHandler)
        return () => {
            document.body.removeEventListener('mouseup', mouseUpHandler)
            document.body.removeEventListener('mousemove', mouseMoveHandler)
        }
    })

    return (
        <HStack
            width={(CELL_WIDTH * days.length) + 1}
            onMouseLeave={onHover && (() => onHover(null))}
            style={{
                cursor: 'default',
                borderColor: UdongColors.GrayNormal,
                borderStyle: 'solid',
                borderWidth: 0.5,
                position: 'relative',
                ...style,
            }}
            ref={ref}
        >
            <div
                style={{
                    top: CELL_HEIGHT - 0.5,
                    bottom: -0.5,
                    right: -0.5,
                    left: -0.5,
                    borderColor: UdongColors.GrayNormal,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    position: 'absolute',
                }}
            />
            {
                data.map((colData, col) => (
                    <VStack key={col}>
                        <HeaderCell key={col}>{days[col]}</HeaderCell>
                        {
                            colData.map((cnt, row) => {
                                const cellSelected = (startCellIdx && calculateInDrag({ col, row }))
                                    ? !selected[startCellIdx.col][startCellIdx.row]
                                    : selected[col][row]
                                return <BodyCell
                                    key={row}
                                    isUpper={(row + startTime) % 2 == 0}
                                    backgroundColor={cellSelected ? (selectColor ?? UdongColors.Secondary) : UdongColors.Primary}
                                    backgroundOpacity={cellSelected ? 1 : cnt / mxCnt / 2}
                                    onHover={onHover && (() => onHover({ col, row }))}
                                    onClick={onClick && (() => onClick({ col, row }))}
                                    onMouseDown={onDrag ? () => {
                                        setStartCellIdx({ col, row })
                                        setEndCellIdx({ col, row })
                                    } : undefined}
                                    gray={gray && gray[col][row]}
                                    text={(colData.length === 1 || (startTime + row) % 2 === 0) ? (startTime + row) : null}
                                />
                            })
                        }
                    </VStack>
                ))
            }
        </HStack>
    )
}

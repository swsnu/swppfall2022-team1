import styled from '@emotion/styled'
import { MouseEvent, useEffect, useRef, useState } from 'react'

import { HStack, VStack } from '../../components/Stack'
import { UdongColors } from '../../theme/ColorPalette'

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
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    cursor: 'default',
})

const HeaderCell = styled(Cell)({
    height: CELL_HEIGHT,
    backgroundColor: UdongColors.SecondaryBright,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    textAlign: 'center',
    lineHeight: 2,
})

const CellBg = styled.div({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    mixBlendMode: 'multiply',
})

const BodyCell = (props: ({
    backgroundOpacity?: number
    selected?: boolean
    borderBottomStyle: 'solid' | 'dashed'
    onHover: () => void
    onClick: () => void
    onMouseDown: (e: MouseEvent<HTMLDivElement>) => void
    text: string
    gray?: boolean
})) => {
    const { backgroundOpacity, borderBottomStyle, text, selected, gray, onHover, onClick, onMouseDown } = props
    return (
        <Cell
            style={{
                height: CELL_HEIGHT / 2,
                borderBottomWidth: 1,
                borderBottomStyle,
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
                    backgroundColor: selected ? UdongColors.Secondary : UdongColors.Primary,
                    opacity: selected ? 1 : backgroundOpacity,
                    zIndex: 0,
                }}
            />
            {gray && <CellBg style={{ backgroundColor: UdongColors.GrayBright, zIndex: 10 }} />}
            <p style={{ margin: 0, zIndex: 30, position: 'relative', cursor: 'default' }} >
                {text}
            </p>
        </Cell>
    )
}

interface TimeTableProps {
    days: string[]
    startTime: number
    data: number[][]
    selected: boolean[][]
    gray?: boolean[][]
    onHover: (idx: CellIdx | null) => void
    onClick: (idx: CellIdx) => void
    onDrag: (startIdx: CellIdx, endIdx: CellIdx) => void
}

export const TimeTable = (props: TimeTableProps) => {
    const { days, startTime, data, selected, gray, onHover, onClick, onDrag } = props

    const [dragCellIdx, setDragCellIdx] = useState<CellIdx|null>(null)
    const ref = useRef<HTMLDivElement>(null)

    const maxFn = (arr: number[]) => arr.reduce((a, b) => Math.max(a, b), 0)
    const mxCnt = maxFn(data.map(colData => maxFn(colData)))

    useEffect(() => {
        const handler = (e: Event) => {
            if(dragCellIdx && ref.current) {
                const startCellIdx = dragCellIdx
                const rect = ref.current.getBoundingClientRect()
                const endCellIdx = {
                    col: Math.floor(((e as unknown as MouseEvent).clientX - rect.left) / CELL_WIDTH),
                    row: Math.floor(((e as unknown as MouseEvent).clientY - rect.top) / (CELL_HEIGHT / 2)) - 2,
                }
                onDrag(startCellIdx, endCellIdx)
            }
        }

        const mouseUpHandler = (e: Event) => {
            handler(e)
            setDragCellIdx(null)
        }

        let timeout: ReturnType<typeof setTimeout> | null = null
        const mouseMoveHandler = (e: Event) => {
            if (timeout) {clearTimeout(timeout)}
            timeout = setTimeout(() => handler(e), 100)
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
            width={CELL_WIDTH * days.length}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: 'default' }}
            ref={ref}
        >
            {
                data.map((colData, col) => (
                    <VStack key={col}>
                        <HeaderCell key={col}>{days[col]}</HeaderCell>
                        {
                            colData.map((cnt, row) => (
                                <BodyCell
                                    key={row}
                                    borderBottomStyle={row % 2 ? 'solid' : 'dashed'}
                                    backgroundOpacity={cnt / mxCnt / 2}
                                    onHover={() => onHover({ col, row })}
                                    onClick={() => onClick({ col, row })}
                                    onMouseDown={() => {
                                        setDragCellIdx({ col, row })
                                        onDrag({ col, row }, { col, row })
                                    }}
                                    selected={selected[col][row]}
                                    gray={gray && gray[col][row]}
                                    text={row % 2 ? '' : `${startTime + (row / 2)}`}
                                />
                            ))
                        }
                    </VStack>
                ))
            }
        </HStack>
    )
}

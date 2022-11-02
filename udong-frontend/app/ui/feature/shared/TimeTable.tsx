import styled from '@emotion/styled'

import { HStack, VStack } from '../../components/Stack'
import { UdongColors } from '../../theme/ColorPalette'

export type CellIdx = {
    col: number
    row: number
}

const Cell = styled.div({
    width: 64,
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
    height: 32,
    backgroundColor: UdongColors.SecondaryBright,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    textAlign: 'center',
    lineHeight: 2,
})

const BodyCell = (props: ({
    backgroundOpacity?: number
    selected?: boolean
    borderBottomStyle: 'solid' | 'dashed'
    onHover: () => void
    onClick: () => void
    text: string
})) => {
    const { backgroundOpacity, borderBottomStyle, text, selected, onHover, onClick } = props
    return (
        <Cell
            style={{
                height: 16,
                borderBottomWidth: 1,
                borderBottomStyle,
                fontSize: 10,
                paddingLeft: 2,
                position: 'relative',
                color: UdongColors.GrayNormal,
            }}
            onMouseOver={onHover}
            onClick={onClick}
        >
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: selected ? UdongColors.Secondary : UdongColors.Primary,
                    opacity: selected ? 1 : backgroundOpacity,
                    zIndex: 0,
                }}
            />
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
    onHover: (idx: CellIdx | null) => void
    onClick: (idx: CellIdx) => void
}

export const TimeTable = (props: TimeTableProps) => {
    const { days, startTime, data, selected, onHover, onClick } = props

    const maxFn = (arr: number[]) => arr.reduce((a, b) => Math.max(a, b), 0)
    const mxCnt = maxFn(data.map(colData => maxFn(colData)))

    return (
        <HStack
            width={64 * days.length}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: 'default' }}
        >
            {
                data.map((colData, colIdx) => (
                    <VStack key={colIdx}>
                        <HeaderCell key={colIdx}>{days[colIdx]}</HeaderCell>
                        {
                            colData.map((cnt, rowIdx) => (
                                <BodyCell
                                    key={rowIdx}
                                    borderBottomStyle={rowIdx % 2 ? 'solid' : 'dashed'}
                                    backgroundOpacity={cnt / mxCnt / 2}
                                    onHover={() => onHover({ col: colIdx, row: rowIdx })}
                                    onClick={() => onClick({ col: colIdx, row: rowIdx })}
                                    selected={selected[colIdx][rowIdx]}
                                    text={rowIdx % 2 ? '' : `${startTime + (rowIdx / 2)}`}
                                />
                            ))
                        }
                    </VStack>
                ))
            }
        </HStack>
    )
}

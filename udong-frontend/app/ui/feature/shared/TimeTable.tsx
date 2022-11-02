import styled from '@emotion/styled'
import { ReactNode } from 'react'

import { HStack, VStack } from '../../components/Stack'
import { UdongColors } from '../../theme/ColorPalette'

const Cell = styled.div({
    width: 64,
    verticalAlign: 'middle',
    borderColor: UdongColors.GrayNormal,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
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
    backgroundOpacity: number
    borderBottomStyle: 'solid' | 'dashed'
    onHover: () => void
    children?: ReactNode
})) => {
    const { backgroundOpacity, borderBottomStyle, children, onHover } = props
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
        >
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: UdongColors.Primary,
                    opacity: backgroundOpacity,
                }}
            />
            {children}
        </Cell>
    )
}

interface TimeTableProps {
    days: string[]
    startTime: number
    data: number[][]
    onHover: (idx: [number, number] | null) => void
}

export const TimeTable = (props: TimeTableProps) => {
    const { days, startTime, data, onHover } = props

    const maxFn = (arr: number[]) => arr.reduce((a, b) => Math.max(a, b), 0)
    const mxCnt = maxFn(data.map(colData => maxFn(colData)))

    return (
        <HStack
            width={64 * days.length}
            onMouseLeave={() => onHover(null)}
        >
            {
                data.map((colData, colIdx) => (
                    <VStack key={colIdx}>
                        <HeaderCell key={colIdx}>{days[colIdx]}</HeaderCell>
                        {
                            colData.map((cnt, rowIdx) => (
                                rowIdx % 2 === 0
                                    ? (
                                        <BodyCell
                                            key={rowIdx}
                                            borderBottomStyle='dashed'
                                            backgroundOpacity={cnt / mxCnt / 2}
                                            onHover={() => onHover([colIdx, rowIdx])}
                                        >
                                            {startTime + (rowIdx / 2)}
                                        </BodyCell>
                                    ) : <BodyCell
                                        key={rowIdx}
                                        borderBottomStyle='solid'
                                        backgroundOpacity={cnt / mxCnt / 2}
                                        onHover={() => onHover([colIdx, rowIdx])}
                                    />
                            ))
                        }
                    </VStack>
                ))
            }
        </HStack>
    )
}

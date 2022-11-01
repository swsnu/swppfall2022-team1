import styled from '@emotion/styled'

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

const BodyCell = styled(Cell)<{
    backgroundColor: string
    borderBottomStyle: 'solid' | 'dashed'
}>(props => ({
    height: 16,
    backgroundColor: props.backgroundColor,
    borderBottomWidth: 1,
    borderBottomStyle: props.borderBottomStyle,
    fontSize: 10,
    color: UdongColors.GrayNormal,
    paddingLeft: 2,
}))

interface TimeTableProps {
    days: string[]
    startTime: number
    data: number[][]
}

export const TimeTable = (props: TimeTableProps) => {
    const { days, startTime, data } = props
    return (
        <HStack>
            {
                data.map((colData, colIdx) => (
                    <VStack key={colIdx}>
                        <HeaderCell key={colIdx}>{days[colIdx]}</HeaderCell>
                        {
                            colData.map((cnt, rowIdx) => (
                                rowIdx % 2 == 0
                                    ? (
                                        <BodyCell
                                            key={colIdx}
                                            borderBottomStyle='dashed'
                                        >
                                            {startTime + (rowIdx / 2)}
                                        </BodyCell>
                                    ) : <BodyCell
                                        key={colIdx}
                                        borderBottomStyle='solid'
                                    />
                            ))
                        }
                    </VStack>
                ))
            }
        </HStack>
    )
}

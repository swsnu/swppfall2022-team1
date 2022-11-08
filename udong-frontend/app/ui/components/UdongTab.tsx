
import styled from '@emotion/styled'

import { UdongColors } from '../theme/ColorPalette'
import { VStack } from './Stack'
import { UdongText } from './UdongText'

interface UdongTabProps {
    text: string
    selected: boolean
    onClick: () => void
}

export const UdongTab = (props: UdongTabProps) => {
    const { text, selected, onClick } = props
    return <VStack
        alignItems={'center'}
        onClick={onClick}
    >
        <UdongText style={selected ? 'TabSelected' : 'TabUnselected'}>
            {text}
        </UdongText>
        <TabUnderline selected={selected}/>
    </VStack>
}

const TabUnderline = styled.div<{ selected: boolean }>((props) => ({
    width: props.selected ? 200 : 120,
    height: props.selected ? 4 : 2,
    backgroundColor: props.selected ? UdongColors.Primary : UdongColors.GrayBright,
    transition: props.selected ? '1.0s' : '0.5s',
}))

import styled from '@emotion/styled'

import { UdongColors } from '../theme/ColorPalette'
import { Spacer } from './Spacer'
import { HStack } from './Stack'
import { UdongText } from './UdongText'

interface UdongRadioButtonProps {
    text: string
    paddingRight?: number
    checked: boolean
    onCheck: () => void
}

export const UdongRadioButton = (props: UdongRadioButtonProps) => {
    const { text, paddingRight, checked, onCheck } = props

    return <HStack
        alignItems={'center'}
        onClick={onCheck}
        style={{ paddingRight }}
    >
        <StyledRadioButton
            type={'radio'}
            checked={checked}
            onChange={() => {return}}
        />
        <Spacer width={5}/>
        <UdongText style={'GeneralContent'}>{text}</UdongText>
    </HStack>
}

const StyledRadioButton = styled.input({
    appearance: 'none',
    webkitAppearance: 'none',
    margin: 0,
    width: 20,
    height: 20,
    border: `1px solid ${UdongColors.GrayNormal}`,
    borderRadius: 10,
    ':checked': {
        '::after': {
            content: '""',
            display: 'block',
            borderRadius: 5,
            width: 10,
            height: 10,
            margin: 4,
            backgroundColor: UdongColors.Primary,
        },
    },
})

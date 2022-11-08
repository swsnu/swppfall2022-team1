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
    disabled?: boolean
}

export const UdongRadioButton = (props: UdongRadioButtonProps) => {
    const { text, paddingRight, checked, onCheck, disabled } = props

    return <HStack
        alignItems={'center'}
        onClick={onCheck}
        style={{ paddingRight }}
    >
        <StyledRadioButton
            type={'radio'}
            checked={checked}
            onChange={() => {return}}
            disabled={disabled}
        />
        <Spacer width={5}/>
        <UdongText
            style={'GeneralContent'}
            cursor={'default'}
        >{text}</UdongText>
    </HStack>
}

const StyledRadioButton = styled.input<{ disabled?: boolean }>((props)=>({
    appearance: 'none',
    webkitAppearance: 'none',
    margin: 0,
    width: 20,
    height: 20,
    border: `1px solid ${UdongColors.GrayNormal}`,
    backgroundColor: props.disabled ? UdongColors.GrayBright : UdongColors.White,
    cursor: props.disabled ? 'not-allowed' : 'deafult',
    borderRadius: 10,
    ':checked': {
        '::after': {
            content: '""',
            display: 'block',
            borderRadius: 5,
            width: 10,
            height: 10,
            margin: 4,
            backgroundColor: props.disabled ? UdongColors.GrayNormal : UdongColors.Primary,
        },
    },
}))

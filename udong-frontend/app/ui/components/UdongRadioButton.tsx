import styled from '@emotion/styled'

import { UdongColors } from '../theme/ColorPalette'
import { Spacer } from './Spacer'
import { HStack } from './Stack'
import { UdongText } from './UdongText'

interface UdongRadioButtonProps {
    text: string
    checked: boolean
    onCheck: () => void
}

export const UdongRadioButton = (props: UdongRadioButtonProps) => {
    const { text, checked, onCheck } = props

    return <HStack
        paddingHorizontal={10}
        alignItems={'center'}
        onClick={onCheck}
    >
        <StyledRadioButton
            type={'radio'}
            checked={checked}
        />
        <Spacer width={10}/>
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

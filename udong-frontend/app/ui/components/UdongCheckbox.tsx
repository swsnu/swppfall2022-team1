import styled from '@emotion/styled'

import checkImg from '../icons/IcCheck.png'
import { UdongColors } from '../theme/ColorPalette'
import { Spacer } from './Spacer'
import { UdongText } from './UdongText'

interface UdongCheckboxProps {
    text: string
    checked: boolean
    onChange: (v: boolean) => void
}

export const UdongCheckbox = (props: UdongCheckboxProps) => {
    const { text, checked, onChange } = props

    return (
        <label style={{ display: 'flex' }}>
            <StyledCheckbox
                type={'checkbox'}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <Spacer width={10}/>
            <UdongText
                style={'GeneralContent'}
                cursor={'default'}
            >
                {text}
            </UdongText>
        </label>
    )
}

const StyledCheckbox = styled.input({
    appearance: 'none',
    webkitAppearance: 'none',
    margin: 0,
    width: 20,
    height: 20,
    border: `1px solid ${UdongColors.GrayNormal}`,
    borderRadius: 3,
    ':checked': {
        '::after': {
            backgroundImage: `url(${checkImg.src})`,
            backgroundSize: 10,
            content: '""',
            width: 10,
            height: 10,
            margin: 4,
            display: 'block',
        },
    },
})

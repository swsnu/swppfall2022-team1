import { UdongColors } from '../theme/ColorPalette'
import { HStack } from './Stack'
import { UdongText } from './UdongText'

type ColorStyle = 'primary' | 'secondary' | 'gray' | 'line'

interface ColorProps {
    backgroundColor: string
    borderColor: string
    textColor: string
}

const getColorProps = (style: ColorStyle): ColorProps => {
    switch (style) {
        case 'primary':
            return {
                backgroundColor: UdongColors.Primary,
                borderColor: 'transparent',
                textColor: UdongColors.White,
            }
        case 'secondary':
            return {
                backgroundColor: UdongColors.Secondary,
                borderColor: 'transparent',
                textColor: UdongColors.White,
            }
        case 'gray':
            return {
                backgroundColor: UdongColors.GrayNormal,
                borderColor: 'transparent',
                textColor: UdongColors.White,
            }
        case 'line':
            return {
                backgroundColor: UdongColors.White,
                borderColor: UdongColors.Primary,
                textColor: UdongColors.Primary,
            }
        default:
            return {
                backgroundColor: UdongColors.Primary,
                borderColor: 'transparent',
                textColor: UdongColors.White,
            }
    }
}

interface UdongChipProps {
    style: ColorStyle
    onClick: () => void
    text: string
}

export const UdongChip = (props: UdongChipProps) => {
    const { style, onClick, text } = props
    const { backgroundColor, textColor, borderColor } = getColorProps(style)

    return <HStack
        paddingHorizontal={16}
        backgroundColor={backgroundColor}
        style={{
            borderRadius: 18,
            border: `1px solid ${borderColor}`,
        }}
        onClick={onClick}
    >
        <UdongText
            style={'ListContentS'}
            margin={4}
            color={textColor}
        >
            {text}
        </UdongText>
    </HStack>
}

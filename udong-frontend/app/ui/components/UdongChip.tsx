import { UdongColors } from '../theme/ColorPalette'
import { HStack } from './Stack'
import { UdongText } from './UdongText'

type UdongChipColorStyle = 'primary' | 'secondary' | 'gray' | 'line'

interface ColorProps {
    backgroundColor: string
    borderColor: string
    textColor: string
}

const getColorProps = (style: UdongChipColorStyle): ColorProps => {
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
    style: UdongChipColorStyle
    onClick: () => void
    text: string
}

/**
 *
 * <UdongChip
 *      style={'primary'}
 *      onClick={() => console.log('hello world')}
 *      text={'hello world'}
 * />
 *
 */
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
            margin={2}
            color={textColor}
        >
            {text}
        </UdongText>
    </HStack>
}

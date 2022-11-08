import { UdongColors } from '../theme/ColorPalette'
import { HStack } from './Stack'
import { UdongText } from './UdongText'

type UdongChipColorStyle = 'fill' | 'line'

const MAX_WIDTH = 250

interface ColorProps {
    backgroundColor: string
    borderColor: string
    textColor: string
}

const getColorProps = (style: UdongChipColorStyle, color: string): ColorProps => {
    switch (style) {
        case 'fill':
            return {
                backgroundColor: color,
                borderColor: 'transparent',
                textColor: UdongColors.White,
            }
        case 'line':
            return {
                backgroundColor: UdongColors.White,
                borderColor: color,
                textColor: color,
            }
        default:
            return {
                backgroundColor: color,
                borderColor: 'transparent',
                textColor: UdongColors.White,
            }
    }
}

interface UdongChipProps {
    color: string
    style: UdongChipColorStyle
    onClick?: () => void
    text: string
    small?: boolean
    clickable?: boolean
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
    const { color, style, onClick, text, small = false, clickable = false } = props
    const { backgroundColor, textColor, borderColor } = getColorProps(style, color)

    return <HStack
        paddingHorizontal={small ? 12 : 18}
        backgroundColor={backgroundColor}
        style={{
            borderRadius: 18,
            border: `1px solid ${borderColor}`,
            maxWidth: MAX_WIDTH,
            cursor: clickable ? 'pointer' : 'default',
        }}
        onClick={onClick}
    >
        <UdongText
            style={small ? 'ListContentXS' : 'ListContentS'}
            margin={2}
            color={textColor}
            textOverflow={'ellipsis'}
            whiteSpace={'nowrap'}
            overflow={'hidden'}
            maxWidth={MAX_WIDTH - 32}
        >
            {text}
        </UdongText>
    </HStack>
}

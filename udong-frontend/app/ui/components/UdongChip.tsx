import { UdongColors } from '../theme/ColorPalette'
import { HStack } from './Stack'
import { UdongText } from './UdongText'

type UdongChipColorStyle = 'primary' | 'secondary' | 'gray' | 'line'

const MAX_WIDTH = 250

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
    const { style, onClick, text, small = false, clickable = false } = props
    const { backgroundColor, textColor, borderColor } = getColorProps(style)

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

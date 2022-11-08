import { Property } from 'csstype'
import { CSSProperties, ReactNode } from 'react'

import { UdongColors } from '../theme/ColorPalette'

interface UdongTextProps {
    children: ReactNode
    style:
        | 'ListTitle'
        | 'ListTitleS'
        | 'ListContentS'
        | 'ListContentXS'
        | 'ListContentUnderscore'
        | 'GeneralTitle'
        | 'GeneralContent'
        | 'TabSelected'
        | 'TabUnselected'
        | 'Header'
    cursor?: Property.Cursor
}

interface TextProps {
    fontSize: number
    fontWeight?: Property.FontWeight
    textDecoration?: Property.TextDecoration
    color?: string
    transition?: string
}

/**
 *
 *
 * <UdongText
 *      style={'ListTitle'}
 *      color={UdongColors.Primary}
 * >
 *      Hello World
 * </UdongText>
 *
 *
 * */
export const UdongText = (props: UdongTextProps & CSSProperties) => {
    const { children, style, cursor } = props

    const textProps = (): TextProps => {
        switch (style) {
            case 'ListTitle':
                return {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: UdongColors.GrayDark,
                }
            case 'ListTitleS':
                return {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: UdongColors.GrayDark,
                }
            case 'ListContentS':
                return {
                    fontSize: 14,
                    color: UdongColors.GrayDark,
                }
            case 'ListContentXS':
                return {
                    fontSize: 12,
                    color: UdongColors.GrayDark,
                }
            case 'ListContentUnderscore':
                return {
                    fontSize: 14,
                    textDecoration: 'underline',
                    color: UdongColors.GrayDark,
                }
            case 'GeneralTitle':
                return {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: UdongColors.GrayDark,
                }
            case 'GeneralContent':
                return {
                    fontSize: 16,
                    color: UdongColors.GrayDark,
                }
            case 'TabSelected':
                return {
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: UdongColors.Primary,
                    transition: '1.0s',
                }
            case 'TabUnselected':
                return {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: UdongColors.GrayBright,
                    transition: '0.5s',
                }
            case 'Header':
                return {
                    fontSize: 15,
                    color: UdongColors.GrayDark,
                }
            default:
                return {
                    fontSize: 16,
                    color: UdongColors.GrayDark,
                }
        }
    }

    return (
        <p
            style={{
                fontFamily: 'SourceSansPro',
                fontSize: textProps().fontSize,
                fontWeight: textProps().fontWeight,
                textDecoration: textProps().textDecoration,
                color: textProps().color,
                transition: textProps().transition,
                margin: 0,
                cursor: cursor ?? undefined,
                ...props,
            }}
        >
            {children}
        </p>
    )
}

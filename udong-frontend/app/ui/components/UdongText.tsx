import { Property } from 'csstype'
import { CSSProperties, ReactNode } from 'react'

interface UdongTextProps {
    children: ReactNode
    style:
        | 'ListTitle'
        | 'ListContentS'
        | 'ListContentXS'
        | 'ListContentUnderscore'
        | 'GeneralTitle'
        | 'GeneralContent'
        | 'TabSelected'
        | 'TabUnselected'
        | 'Header'
}

interface TextProps {
    fontSize: number
    fontWeight?: Property.FontWeight
    textDecoration?: Property.TextDecoration
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
    const { children, style } = props

    const textProps = (): TextProps => {
        switch (style) {
            case 'ListTitle':
                return {
                    fontSize: 16,
                    fontWeight: 'bold',
                }
            case 'ListContentS':
                return {
                    fontSize: 14,
                }
            case 'ListContentXS':
                return {
                    fontSize: 12,
                }
            case 'ListContentUnderscore':
                return {
                    fontSize: 14,
                    textDecoration: 'underline',
                }
            case 'GeneralTitle':
                return {
                    fontSize: 20,
                    fontWeight: 'bold',
                }
            case 'GeneralContent':
                return {
                    fontSize: 16,
                }
            case 'TabSelected':
                return {
                    fontSize: 30,
                    fontWeight: 'bold',
                }
            case 'TabUnselected':
                return {
                    fontSize: 20,
                    fontWeight: 'bold',
                }
            case 'Header':
                return {
                    fontSize: 15,
                }
            default:
                return {
                    fontSize: 16,
                }
        }
    }

    return (
        <p
            style={{
                fontFamily: 'sans-serif',
                fontSize: textProps().fontSize,
                fontWeight: textProps().fontWeight,
                textDecoration: textProps().textDecoration,
                ...props,
            }}
        >
            {children}
        </p>
    )
}

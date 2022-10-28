import { CSSProperties, ReactNode } from 'react'

import { UdongColors } from '../theme/ColorPalette'

interface UdongButtonProps {
    children: ReactNode
    style: 'fill' | 'line'
    color?: string
    onClick: () => void
}

export const UdongButton = (props: UdongButtonProps & CSSProperties) => {
    const { children, style, color, onClick } = props

    return <button
        style={{
            width: 'fit-content',
            backgroundColor: style === 'fill' ? (color ?? UdongColors.Primary) : UdongColors.White,
            border: `1px solid ${color ?? UdongColors.Primary}`,
            borderRadius: 10,
            padding: '8px 12px',
            color: style === 'line' ? (color ?? UdongColors.Primary) : UdongColors.White,
            fontSize: 16,
            ...props,
        }}
        onClick={onClick}
    >
        {children}
    </button>
}

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { CSSProperties, ReactNode } from 'react'

import { UdongColors } from '../theme/ColorPalette'

interface UdongButtonProps {
    children: ReactNode
    style: 'fill' | 'line'
    color?: string
    onClick: () => void
    disabled?: boolean
}

/**
 * <UdongButton
 *      onClick={() => console.log('hello world')}
 *      style={'fill'}
 *  >
 *      제출
 * </UdongButton>
 *
 * <UdongButton
 *      onClick={() => console.log('hello world')}
 *      style={'line'}
 *      color={UdongColors.Warning}
 *  >
 *      삭제
 * </UdongButton>
 * */
export const UdongButton = (props: UdongButtonProps & CSSProperties) => {
    const { children, style, color, onClick, disabled } = props

    return <StyledButton
        style={{
            width: 'fit-content',
            backgroundColor: style === 'fill' ? (color ?? UdongColors.Primary) : UdongColors.White,
            border: `1px solid ${color ?? UdongColors.Primary}`,
            borderRadius: 10,
            padding: '8px 16px',
            fontSize: 16,
            cursor: 'pointer',
            ...props,
            color: style === 'line' ? (color ?? UdongColors.Primary) : UdongColors.White,
        }}
        color={color}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </StyledButton>
}

const StyledButton = styled.button`
    ${props => {
        const color = `${props.color ?? UdongColors.Primary}10`
        return css`
            &:hover {
                box-shadow: 200px 0 0 0 ${color} inset,
                            -200px 0 0 0 ${color} inset;
                transition: 1.0s;
            },
        `
    }}   
`

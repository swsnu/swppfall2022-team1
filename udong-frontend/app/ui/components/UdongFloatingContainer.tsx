import { CSSProperties, ReactNode } from 'react'

import { UdongColors } from '../theme/ColorPalette'
import { VStack } from './Stack'

interface UdongFloatingContainerProps {
    children: ReactNode
}

export const UdongFloatingContainer = (props: UdongFloatingContainerProps & CSSProperties) => {
    const { children } = props
    return <VStack
        style={{
            borderRadius: 30,
            border: `2px solid ${UdongColors.GrayBright}`,
            boxShadow: `1px 1px 2px 2px ${UdongColors.GrayBright}`,
            ...props,
        }}
    >
        {children}
    </VStack>
}

import styled from '@emotion/styled'
import { Property } from 'csstype'

interface StackProps {
    flex?: number
    backgroundColor?: string
    paddingVertical?: number
    paddingHorizontal?: number
    gap?: number
    alignItems?: Property.AlignItems
    justifyContent?: Property.JustifyContent
    height?: Property.Height | number
    width?: Property.Width | number
    position?: Property.Position
    top?: Property.Top | number
    bottom?: Property.Bottom | number
}

const Stack = styled.div<StackProps>((props: StackProps) => {
    return {
        backgroundColor: props.backgroundColor,
        paddingLeft: props.paddingHorizontal,
        paddingRight: props.paddingHorizontal,
        paddingTop: props.paddingVertical,
        paddingBottom: props.paddingVertical,
        flex: props.flex,
        display: 'flex',
        gap: props.gap,
        alignItems: props.alignItems,
        justifyContent: props.justifyContent,
        height: props.height,
        width: props.width,
        position: props.position,
        top: props.top,
        bottom: props.bottom,
    }
})

export const VStack = styled(Stack)({
    flexDirection: 'column',
})

export const HStack = styled(Stack)({
    flexDirection: 'row',
})

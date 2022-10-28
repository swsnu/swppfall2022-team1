import { Property } from 'csstype'
import React from 'react'

type Props = {
    backgroundColor?: string
    paddingLeft?: number
    paddingRight?: number
    flex?: number
} & ({
    marginLeft?: number
    marginRight?: number
    marginTop?: number
    marginBottom?: number
    height: Property.Height<string | number>
    width?: never
} | {
    marginLeft?: number
    marginRight?: number
    marginTop?: number
    marginBottom?: number
    height?: never
    width: Property.Width<string | number>
})

/**
 * <Spacer height={16}/> (VStack 내에서)
 * <Spacer width={16}/> (HStack 내에서)
 *
 * <Spacer height={8} backgroundColor={UdongColors.GrayNormal}/> (divider처럼 쓰기)
 * */
export const Spacer = (props: Props) => {
    const { marginBottom, marginTop, marginRight, marginLeft } = props
    const { paddingRight, paddingLeft } = props
    const { flex, height, width, backgroundColor } = props

    return (
        <div
            style={{
                marginLeft,
                marginRight,
                marginTop,
                marginBottom,
                paddingLeft,
                paddingRight,
                flex,
                height: height ?? undefined,
                width: width ?? undefined,
                backgroundColor,
            }}
        />
    )
}

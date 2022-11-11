import { Property } from 'csstype'
import Image from 'next/image'
import React, { CSSProperties } from 'react'

type SafeNumber = number | `${number}`

interface Props {
    src: string
    alt?: string
    height: SafeNumber
    width: SafeNumber
    style?: CSSProperties
    onClick?: () => void
    objectFit?: Property.ObjectFit
    objectPosition?: Property.ObjectPosition
    alignSelf?: Property.AlignSelf
    borderRadius?: number
    border?: string
    clickable?: boolean
}

export const UdongImage = (props: Props) => {
    const {
        alt,
        src,
        height,
        width,
        style,
        onClick,
        objectFit,
        objectPosition,
        alignSelf,
        borderRadius,
        border,
        clickable,
    } = props
    return (
        <Image
            alt={alt ?? '이미지 없음'}
            src={src}
            height={height}
            width={width}
            style={{
                objectFit,
                objectPosition,
                alignSelf,
                display: 'block',
                borderRadius: borderRadius ?? 0,
                border,
                cursor: clickable ? 'pointer' : 'default',
                ...style,
            }}
            onClick={onClick}
        />
    )
}

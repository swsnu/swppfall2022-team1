import { useCallback, useEffect, useState } from 'react'

import { UdongColors } from '../theme/ColorPalette'
import { HStack } from './Stack'
import { UdongImage } from './UdongImage'

export interface UdongTextFieldProps {
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    isCleared?: boolean
    inputRef: React.Ref<any> // eslint-disable-line
    defaultValue?: string
    placeholder?: string
    width?: number | string
    imageSrc?: string
}

/**
 *
 * <UdongTextField defaultValue={''}/>
 *
 * */
export const UdongTextField = (props: UdongTextFieldProps) => {
    const { onChange, isCleared, inputRef, defaultValue, width, imageSrc, placeholder } = props
    const [value, setValue] = useState(defaultValue ?? '')

    useEffect(() => {
        if (isCleared) {
            setValue('')
        }
    }, [isCleared])

    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChange(event)
        setValue(event.target.value)
    }, [onChange])

    return <HStack
        alignItems={'center'}
        style={{
            backgroundColor: UdongColors.GrayBright,
            borderRadius: 14,
        }}
        width={width ?? '100%'}
    >
        <input
            ref={inputRef}
            type={'text'}
            value={value}
            onChange={handleOnChange}
            placeholder={placeholder}
            style={{
                backgroundColor: UdongColors.GrayBright,
                borderRadius: 14,
                border: '0px solid transparent',
                outline: 'none',
                fontFamily: 'sans-serif',
                fontSize: 14,
                color: UdongColors.GrayNormal,
                padding: '8px 16px',
                width: width ?? '100%',
                minWidth: width ?? '100%',
            }}
        />
        {imageSrc &&
            <UdongImage
                src={imageSrc}
                width={20}
                height={20}
                style={{
                    marginRight: 10,
                }}
            />
        }
    </HStack>
}

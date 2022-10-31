import { useCallback, useState } from 'react'

import { UdongColors } from '../theme/ColorPalette'
import { HStack } from './Stack'
import { UdongImage } from './UdongImage'

interface TempUdongTextField {
    defaultValue: string
    width?: number | string
    imageSrc?: string
}

/**
 *
 * <UdongTextField defaultValue={''}/>
 *
 * */
// TODO: needs developing & testing
export const UdongTextField = (props: TempUdongTextField) => {
    const { defaultValue, width, imageSrc } = props
    const [value, setValue] = useState(defaultValue)

    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value)
    }, [])

    return <HStack
        alignItems={'center'}
        style={{
            backgroundColor: UdongColors.GrayBright,
            borderRadius: 14,
        }}
        width={width ?? '100%'}
    >
        <input
            type={'text'}
            value={value}
            onChange={handleOnChange}
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

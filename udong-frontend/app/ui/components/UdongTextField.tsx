import { useCallback, useState } from 'react'

import { UdongColors } from '../theme/ColorPalette'

interface TempUdongTextField {
    defaultValue: string
    width?: number | string
}

/**
 *
 * <UdongTextField defaultValue={''}/>
 *
 * */
// TODO: needs developing & testing
export const UdongTextField = (props: TempUdongTextField) => {
    const { defaultValue, width } = props
    const [value, setValue] = useState(defaultValue)

    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value)
    }, [])

    return <input
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
            color: UdongColors.GrayDark,
            padding: '8px 16px',
            width: width,
        }}
    />
}

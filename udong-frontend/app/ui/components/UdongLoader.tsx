import { BeatLoader } from 'react-spinners'

import { UdongColors } from '../theme/ColorPalette'
import { HStack } from './Stack'

type SafeNumber = number | `${number}`

interface UdongLoaderProps {
    height?: SafeNumber
    width?: SafeNumber
}

export const UdongLoader = (props: UdongLoaderProps) => {
    const { height, width } = props

    return <HStack
        width={width ?? '100%'}
        height={height ?? '100%'}
        alignItems={'center'}
        justifyContent={'center'}
    >
        <BeatLoader
            color={UdongColors.Primary}
            speedMultiplier={2}
        />
    </HStack>
}


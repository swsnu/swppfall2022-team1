import { BeatLoader } from 'react-spinners'

import { UdongColors } from '../theme/ColorPalette'
import { HStack } from './Stack'

const UdongLoader = () => {
    return <HStack
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        paddingVertical={200}
    >
        <BeatLoader
            color={UdongColors.Primary}
            speedMultiplier={2}
        />
    </HStack>
}

export default UdongLoader

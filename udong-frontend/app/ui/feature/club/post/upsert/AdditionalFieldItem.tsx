import { ReactNode } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import remove from '../../../../icons/IcClose.png'

interface AdditionalFieldItemProps {
    item: ReactNode
}

export const AdditionalFieldItem = (props: AdditionalFieldItemProps) => {
    const { item } = props
    return <HStack
        alignItems={'center'}
        paddingHorizontal={10}
    >
        {item}
        <Spacer width={10}/>
        <UdongImage
            src={remove.src}
            height={10}
            width={10}
        />
    </HStack>
}

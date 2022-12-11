import { ReactNode } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import remove from '../../../../icons/IcClose.png'

interface AdditionalFieldItemProps {
    item: ReactNode
    onRemove: () => void
}

export const AdditionalFieldItem = (props: AdditionalFieldItemProps) => {
    const { item, onRemove } = props
    return <HStack
        alignItems={'center'}
        style={{ paddingRight: 20 }}
    >
        {item}
        <Spacer width={10}/>
        <UdongImage
            src={remove.src}
            height={10}
            width={10}
            onClick={onRemove}
        />
    </HStack>
}

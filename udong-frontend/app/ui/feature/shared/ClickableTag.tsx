import { useCallback } from 'react'

import { VStack } from '../../components/Stack'
import { UdongChip } from '../../components/UdongChip'

interface TagItemProps {
    text: string
    isIncluded: boolean
    onClick: () => void
}

export const ClickableTag = (props: TagItemProps) => {
    const { text, isIncluded, onClick } = props

    const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        onClick()
    }, [onClick])

    return <VStack
        onClick={handleOnClick}
        paddingHorizontal={6}
    >
        <UdongChip
            style={isIncluded ? 'primary' : 'gray'}
            text={text}
            clickable={true}
        />
    </VStack>
}

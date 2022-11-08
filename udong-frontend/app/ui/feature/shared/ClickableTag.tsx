import { useCallback } from 'react'

import { VStack } from '../../components/Stack'
import { UdongChip } from '../../components/UdongChip'
import { UdongColors } from '../../theme/ColorPalette'

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
            color={isIncluded ? UdongColors.Primary : UdongColors.GrayNormal}
            style={'fill'}
            text={text}
            clickable={true}
        />
    </VStack>
}

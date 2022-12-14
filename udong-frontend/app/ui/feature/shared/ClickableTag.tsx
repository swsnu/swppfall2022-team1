import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BasicTag } from '../../../domain/model/Tag'
import { AppDispatch } from '../../../domain/store'
import { tagSelector } from '../../../domain/store/tag/TagSelector'
import { tagActions } from '../../../domain/store/tag/TagSlice'
import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongChip } from '../../components/UdongChip'
import { UdongColors } from '../../theme/ColorPalette'
import { UserListModal } from './UserListModal'

interface TagItemProps {
    tag: BasicTag
    isIncluded: boolean
}

export const ClickableTag = (props: TagItemProps) => {
    const { tag, isIncluded } = props
    const dispatch = useDispatch<AppDispatch>()

    const selectedTag = useSelector(tagSelector.selectedTag)
    const [isMemberListOpen, setIsMemberListOpen] = useState(false)

    const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()

        setIsMemberListOpen(true)
        dispatch(tagActions.getTag(tag.id))
    }, [dispatch, tag])

    if (!tag) {
        return null
    }

    return <HStack
        onClick={handleOnClick}
    >
        <UdongChip
            color={isIncluded ? UdongColors.Primary : UdongColors.GrayNormal}
            style={'fill'}
            text={tag.name}
            clickable={true}
        />
        <Spacer width={10}/>

        {selectedTag &&
            <UserListModal
                users={selectedTag.users}
                isOpen={isMemberListOpen}
                setIsOpen={setIsMemberListOpen}
                title={tag.name}
            />
        }
    </HStack>
}

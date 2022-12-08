import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { tagSelector } from '../../../../domain/store/tag/TagSelector'
import { tagActions } from '../../../../domain/store/tag/TagSlice'
import { userSelector } from '../../../../domain/store/user/UserSelector'
import { userActions } from '../../../../domain/store/user/UserSlice'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { DeleteModal } from '../../shared/DeleteModal'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'
import { UserListModal } from '../../shared/UserListModal'
import { TagItem } from './TagItem'
import { TagUpsertModal } from './TagUpsertModal'

interface TagContainerProps {
    clubId: number
}

export const TagContainer = (props: TagContainerProps) => {
    const { clubId } = props
    const dispatch = useDispatch<AppDispatch>()
    const tags = useSelector(tagSelector.tags)
    const selectedTag = useSelector(tagSelector.selectedTag)
    const userMe = useSelector(userSelector.userMe)

    useEffect(() => {
        dispatch(userActions.getMyProfile())
        dispatch(tagActions.getTags(clubId))
    }, [clubId, dispatch])

    const [showUpsertModal, setShowUpsertModal] = useState(false)
    const [showMembers, setShowMembers] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const searchRef = useRef<HTMLInputElement | undefined>(null)

    const handleClickTag = useCallback(async (tagId: number) => {
        const response = await dispatch(tagActions.getTag(tagId))
        if (response.type === `${tagActions.getTag.typePrefix}/fulfilled`) {
            setShowMembers(true)
        }
    }, [dispatch])

    if (!userMe) {
        return null
    }

    return <VStack>
        <HStack justifyContent={'end'}>
            <UdongButton
                style={'line'}
                onClick={() => setShowUpsertModal(true)}
            >
                태그 추가하기
            </UdongButton>
        </HStack>
        <Spacer height={20}/>

        <UdongSearchBar
            inputRef={searchRef}
            onChange={() => {return}}
        />
        <Spacer height={8}/>

        {tags.map((tag, index) => {
            return <VStack
                key={tag.name + index}
                onClick={() => handleClickTag(tag.id)}
            >
                <TagItem
                    name={tag.name}
                    createdAt={tag.createdAt}
                    updatedAt={tag.updatedAt}
                    isUserIncluded={tag.users.some(user => user.id === userMe.id)}
                    showEditModal={setShowUpsertModal}
                    onClickDelete={setShowDeleteModal}
                />
            </VStack>
        })}

        {selectedTag &&
            <UserListModal
                users={selectedTag.users}
                isOpen={showMembers}
                setIsOpen={setShowMembers}
                title={'2022년 겨울 공연 2팀'}
            />
        }

        <TagUpsertModal
            isOpen={showUpsertModal}
            setIsOpen={setShowUpsertModal}
            title={'2022년 겨울 공연 2팀'}
        />

        <DeleteModal
            deleteObjectText={'태그'}
            warningText={'경고 문구'}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
            onClickDelete={() => {return}}
        />

        <ScrollToTopButton/>
    </VStack>
}

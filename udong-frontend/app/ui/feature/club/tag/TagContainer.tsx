import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { tagSelector } from '../../../../domain/store/tag/TagSelector'
import { tagActions } from '../../../../domain/store/tag/TagSlice'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { DeleteModal } from '../../shared/DeleteModal'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'
import { UserListModal } from '../../shared/UserListModal'
import { TagItem } from './TagItem'
import { TagUpsertModal } from './TagUpsertModal'

interface TagItemType {
    name: string
    isUserIncluded: boolean
}

const tags: Array<TagItemType> = [
    {
        name: '전체',
        isUserIncluded: true,
    },
    {
        name: '2022년 겨울 공연 1팀',
        isUserIncluded: true,
    },
    {
        name: '2022년 겨울 공연 2팀',
        isUserIncluded: false,
    },
    {
        name: '2022년 겨울 공연 3팀',
        isUserIncluded: false,
    },
    {
        name: '월요일 세션',
        isUserIncluded: true,
    },
    {
        name: '수요일 세션',
        isUserIncluded: false,
    },
    {
        name: '2022년 여름 공연 1팀',
        isUserIncluded: false,
    },
    {
        name: '2022년 여름 공연 2팀',
        isUserIncluded: true,
    },
    {
        name: '2022년 여름 공연 3팀',
        isUserIncluded: false,
    },
]

const dummy = tags

interface TagContainerProps {
    clubId: number
}

export const TagContainer = (props: TagContainerProps) => {
    const { clubId } = props
    const dispatch = useDispatch<AppDispatch>()
    const tags = useSelector(tagSelector.tags)

    useEffect(() => {
        dispatch(tagActions.getTags(clubId))
    }, [clubId, dispatch])

    const [showUpsertModal, setShowUpsertModal] = useState(false)
    const [showMembers, setShowMembers] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const searchRef = useRef<HTMLInputElement | undefined>(null)

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
                onClick={() => setShowMembers(true)}
            >
                <TagItem
                    name={tag.name}
                    isUserIncluded={true}
                    showEditModal={setShowUpsertModal}
                    onClickDelete={setShowDeleteModal}
                />
            </VStack>
        })}

        <UserListModal
            isOpen={showMembers}
            setIsOpen={setShowMembers}
            title={'2022년 겨울 공연 2팀'}
        />

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

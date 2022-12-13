import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EditTag, Tag } from '../../../../domain/model/Tag'
import { AppDispatch } from '../../../../domain/store'
import { clubActions } from '../../../../domain/store/club/ClubSlice'
import { tagSelector } from '../../../../domain/store/tag/TagSelector'
import { tagActions, TagErrorType } from '../../../../domain/store/tag/TagSlice'
import { userSelector } from '../../../../domain/store/user/UserSelector'
import { userActions } from '../../../../domain/store/user/UserSlice'
import { isAllObjectFieldsUndefined } from '../../../../utility/helperTypes'
import { useDebouncedSearch } from '../../../../utility/useDebouncedSearch'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongErrorModal } from '../../../components/UdongErrorModal'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { DeleteModal } from '../../shared/DeleteModal'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'
import { UserListModal } from '../../shared/UserListModal'
import { DefaultTagItem, TagItem } from './TagItem'
import { TagUpsertModal } from './TagUpsertModal'

const getErrorMessage = (errors: TagErrorType): string => {
    if (errors.editTagError) {
        return errors.editTagError.message
    } else if (errors.deleteTagError) {
        return errors.deleteTagError.message
    } else {
        return ''
    }
}

interface TagContainerProps {
    clubId: number
}

export const TagContainer = (props: TagContainerProps) => {
    const { clubId } = props
    const dispatch = useDispatch<AppDispatch>()

    const tags = useSelector(tagSelector.tags)
    const selectedTag = useSelector(tagSelector.selectedTag)
    const userMe = useSelector(userSelector.userMe)
    const errors = useSelector(tagSelector.errors)

    const searchRef = useRef<HTMLInputElement | undefined>(null)
    const [searchValue, setSearchValue] = useState('')
    const [keyword, setKeyword] = useState('')
    useDebouncedSearch(searchValue, setKeyword, 300)

    const [showUpsertModal, setShowUpsertModal] = useState(false)
    const [showMembers, setShowMembers] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)

    useEffect(() => {
        if (!isAllObjectFieldsUndefined(errors)) {
            setShowErrorModal(true)
        }
    }, [errors])

    useEffect(() => {
        dispatch(userActions.getMyProfile())
        dispatch(tagActions.getTags(clubId))
    }, [clubId, dispatch])

    const getTagMembers = useCallback(async (tagId: number) => {
        const response = await dispatch(tagActions.getTag(tagId))
        if (response.type === `${tagActions.getTag.typePrefix}/fulfilled`) {
            setShowMembers(true)
        }
    }, [dispatch])

    const handleClickTagEdit = useCallback( async (tagId: number) => {
        const response = await dispatch(tagActions.getTag(tagId))
        if (response.type === `${tagActions.getTag.typePrefix}/fulfilled`) {
            setShowUpsertModal(true)
        }
    }, [dispatch])

    const handleConfirmTagEdit = useCallback((tagId: number, tag: EditTag) => {
        dispatch(tagActions.editTag({ tagId, tag }))
        setShowUpsertModal(false)
    }, [dispatch])

    const handleClickTagDelete = useCallback((tag: Tag) => {
        dispatch(tagActions.setSelectedTag(tag))
        setShowDeleteModal(true)
    }, [dispatch])

    const handleConfirmTagDelete = useCallback(() => {
        if (selectedTag) {
            dispatch(tagActions.deleteTag(selectedTag.id))
        }
        setShowDeleteModal(false)
    }, [dispatch, selectedTag])

    const handleCloseErrorModal = useCallback(() => {
        setShowErrorModal(false)
        dispatch(clubActions.resetErrors())
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
            onChange={() => setSearchValue(searchRef.current?.value ?? '')}
        />
        <Spacer height={8}/>

        {tags.filter((tag)=> {
            let result = false
            if (tag.name.includes(keyword)) {
                result = true
            } else {
                tag.users.forEach((user)=>{
                    if (user.name.includes(keyword) || user.email.includes(keyword)){
                        result = true
                    }
                })
            }
            return result
        }).map((tag, index) => {
            return <VStack
                key={tag.name + index}
                onClick={() => getTagMembers(tag.id)}
            >
                {tag.isDefault ?
                    <DefaultTagItem/>
                    :
                    <TagItem
                        name={tag.name}
                        createdAt={tag.createdAt}
                        updatedAt={tag.updatedAt}
                        isUserIncluded={tag.users.some(user => user.id === userMe.id)}
                        showEditModal={() => handleClickTagEdit(tag.id)}
                        onClickDelete={() => handleClickTagDelete(tag)}
                    />
                }
            </VStack>
        })}

        {selectedTag &&
            <UserListModal
                users={selectedTag.users}
                isOpen={showMembers}
                setIsOpen={setShowMembers}
                title={selectedTag.name}
            />
        }

        {selectedTag &&
            <TagUpsertModal
                clubId={clubId}
                isOpen={showUpsertModal}
                setIsOpen={setShowUpsertModal}
                tag={selectedTag}
                confirmEditTag={handleConfirmTagEdit}
            />
        }

        <DeleteModal
            deleteObjectText={'태그'}
            warningText={'태그 삭제 후 복구가 불가능합니다.'}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
            onClickDelete={handleConfirmTagDelete}
        />

        {!isAllObjectFieldsUndefined(errors) &&
            <UdongErrorModal
                message={getErrorMessage(errors)}
                isOpen={showErrorModal}
                setIsOpen={handleCloseErrorModal}
            />
        }

        <ScrollToTopButton/>
    </VStack>
}

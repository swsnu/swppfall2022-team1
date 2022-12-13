import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EditTag } from '../../../../domain/model/Tag'
import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions } from '../../../../domain/store/club/ClubSlice'
import { tagSelector } from '../../../../domain/store/tag/TagSelector'
import { tagActions } from '../../../../domain/store/tag/TagSlice'
import { useDebouncedSearch } from '../../../../utility/useDebouncedSearch'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongImage } from '../../../components/UdongImage'
import { UdongModal } from '../../../components/UdongModal'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { UdongText } from '../../../components/UdongText'
import { UdongTextField } from '../../../components/UdongTextField'
import check from '../../../icons/IcCheck.png'
import close from '../../../icons/IcClose.png'
import edit from '../../../icons/IcPencil.png'
import { UdongColors } from '../../../theme/ColorPalette'
import { UserItem } from '../../shared/UserItem'

interface TagUpsertModalProps {
    clubId: number
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    confirmEditTag?: (tagId: number, newTag: EditTag) => void
    createTag?: (name: string, userIds: Array<number>) => void
}

export const TagUpsertModal = (props: TagUpsertModalProps) => {
    const { clubId, isOpen, setIsOpen, confirmEditTag, createTag } = props
    const dispatch = useDispatch<AppDispatch>()

    const clubMembers = useSelector(clubSelector.members)
    const selectedUserIds = useSelector(tagSelector.selectedUserIds)
    const selectedTag = useSelector(tagSelector.selectedTag)

    const selectedMembers = clubMembers.filter(member => selectedUserIds.some(userId => userId === member.user.id))
    const deselectedMembers = clubMembers.filter(member => !selectedUserIds.some(userId => userId === member.user.id))

    const searchRef = useRef<HTMLInputElement | undefined>(null)
    const [searchValue, setSearchValue] = useState('')
    const [keyword, setKeyword] = useState('')
    useDebouncedSearch(searchValue, setKeyword, 300)

    const nameRef = useRef<HTMLInputElement | undefined>(null)
    const [isNameInputVisible, setIsNameInputVisible] = useState(false)
    const [nameInputValue, setNameInputValue] = useState(selectedTag?.name ?? '태그 이름')
    const [confirmedName, setConfirmedName] = useState(selectedTag?.name ?? '태그 이름')

    useEffect(() => {
        setNameInputValue(selectedTag?.name ?? '태그 이름')
        setConfirmedName(selectedTag?.name ?? '태그 이름')
    }, [selectedTag])

    useEffect(() => {
        dispatch(clubActions.getClubMembers(clubId))
        selectedTag?.users.map(user => dispatch(tagActions.selectUser(user.id)))

        return () => {
            dispatch(tagActions.resetSelectedUsers())
            setConfirmedName(selectedTag?.name ?? '태그 이름')
            setNameInputValue(selectedTag?.name ?? '태그 이름')
            setIsNameInputVisible(false)
        }
    }, [clubId, dispatch, selectedTag])

    const handleSelectUser = useCallback((userId: number) => {
        dispatch(tagActions.selectUser(userId))
    }, [dispatch])

    const handleDeselectUser = useCallback((userId: number) => {
        dispatch(tagActions.deselectUser(userId))
    }, [dispatch])

    const handleEditName = useCallback(() => {
        if (!isNameInputVisible) {
            setIsNameInputVisible(true)
        } else {
            setConfirmedName(nameInputValue)
            setIsNameInputVisible(false)
        }
    }, [isNameInputVisible, nameInputValue])

    const handleSave = useCallback(() => {
        if (confirmEditTag && selectedTag) {
            confirmEditTag(selectedTag.id, { name: confirmedName, newUsers: selectedUserIds })
        }
        if (createTag) {
            createTag(confirmedName, selectedUserIds)
        }
    }, [confirmEditTag, confirmedName, selectedUserIds, selectedTag, createTag])

    const handleCloseModal = useCallback(() => {
        setIsOpen(false)
        dispatch(tagActions.setSelectedTag(undefined))
    }, [dispatch, setIsOpen])

    return <UdongModal
        width={'60vw'}
        isOpen={isOpen}
        setIsOpen={handleCloseModal}
    >
        <VStack
            width={'100%'}
            paddingHorizontal={40}
            alignItems={'center'}
            style={{ padding: '25px 40px 0 40px' }}
        >
            <VStack
                width={'100%'}
                alignItems={'end'}
            >
                <UdongImage
                    src={close.src}
                    height={15}
                    width={15}
                    onClick={handleCloseModal}
                    clickable={true}
                />
            </VStack>
            <Spacer height={5}/>

            <HStack alignItems={'center'}>
                {isNameInputVisible ?
                    <UdongTextField
                        inputRef={nameRef}
                        defaultValue={nameInputValue}
                        onChange={() => setNameInputValue(nameRef.current?.value ?? '')}
                    />
                    :
                    <UdongText style={'GeneralTitle'}>{confirmedName ?? '태그 이름'}</UdongText>
                }
                <Spacer width={15}/>
                <UdongImage
                    src={isNameInputVisible ? check.src : edit.src}
                    height={20}
                    width={20}
                    clickable={true}
                    onClick={handleEditName}
                />
            </HStack>
            <Spacer height={45}/>

            <HStack width={'100%'}>
                <VStack flex={1}>
                    <UdongSearchBar
                        inputRef={searchRef}
                        onChange={() => {
                            setSearchValue(searchRef.current?.value ?? '')
                        }}
                    />
                    <Spacer height={15}/>

                    <VStack
                        width={'100%'}
                        height={'50vh'}
                        alignItems={'start'}
                        style={{ overflow: 'scroll', paddingBottom: 15 }}
                    >
                        {deselectedMembers.filter((member)=> {
                            return member.user.name.includes(keyword) || member.user.email.includes(keyword)
                        }).map((member, index) => {
                            return <VStack
                                key={`${member}/${index}`}
                                onClick={() => handleSelectUser(member.user.id)}
                            >
                                <UserItem name={member.user.name}/>
                            </VStack>
                        })}
                    </VStack>
                </VStack>

                <Spacer width={25}/>
                <HStack style={{ paddingBottom: 10 }}>
                    <Spacer
                        width={1}
                        backgroundColor={UdongColors.GrayBright}
                    />
                </HStack>
                <Spacer width={25}/>

                <VStack
                    flex={1}
                    alignItems={'center'}
                >
                    <UdongText style={'GeneralContent'}>{`선택한 유저 목록 (${selectedMembers.length})`}</UdongText>
                    <Spacer height={15}/>

                    <VStack
                        width={'100%'}
                        height={'50vh'}
                        alignItems={'start'}
                        style={{ overflow: 'scroll', paddingBottom: 15 }}
                    >
                        {selectedMembers.map((member, index) => {
                            return <UserItem
                                name={member.user.name}
                                key={`${member.user}/${index}`}
                                id={member.user.id}
                                onRemoveUser={handleDeselectUser}
                            />
                        })}
                    </VStack>
                </VStack>
            </HStack>

            <Spacer height={66}/>
            <UdongButton
                style={'line'}
                onClick={handleSave}
            >
                저장하기
            </UdongButton>
            <Spacer height={20}/>

        </VStack>
    </UdongModal>
}

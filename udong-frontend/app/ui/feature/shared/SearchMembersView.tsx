import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ClubUser } from '../../../domain/model/ClubUser'
import { AppDispatch } from '../../../domain/store'
import { clubActions } from '../../../domain/store/club/ClubSlice'
import { useDebouncedSearch } from '../../../utility/useDebouncedSearch'
import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { UdongSearchBar } from '../../components/UdongSearchBar'
import { ClubMemberProfileView } from '../club/info/ClubMemberProfileView'
import { UserItem } from './UserItem'

interface SearchMembersViewProps {
    members: Array<ClubUser>
    clubId: number
}

export const SearchMembersView = (props: SearchMembersViewProps) => {
    const { members, clubId } = props
    const dispatch = useDispatch<AppDispatch>()

    const [showMemberProfile, setShowMemberProfile] = useState(false)

    const searchRef = useRef<HTMLInputElement | undefined>(null)
    const [searchValue, setSearchValue] = useState('')
    const [keyword, setKeyword] = useState('')
    useDebouncedSearch(searchValue, setKeyword, 300)

    const handleMemberClick = useCallback((user: ClubUser) => {
        dispatch(clubActions.setSelectedMember(user))
        setShowMemberProfile(true)
    }, [dispatch])

    return <VStack>
        <UdongSearchBar
            inputRef={searchRef}
            onChange={() => {
                setSearchValue(searchRef.current?.value ?? '')
            }}
        />
        <Spacer height={15}/>

        <VStack
            style={{
                overflow: 'scroll',
                maxHeight: 480,
            }}
        >
            {members.filter((member)=>{
                return member.user.name.includes(keyword) || member.user.email.includes(keyword)
            }).map((member, index) => {
                return <VStack
                    key={member.user.name + index}
                    onClick={() => handleMemberClick(member)}
                >
                    <UserItem
                        name={member.user.name}
                        isMe={false}
                        isAdmin={false}
                    />
                </VStack>
            })}
        </VStack>

        <ClubMemberProfileView
            clubId={clubId}
            isOpen={showMemberProfile}
            setIsOpen={setShowMemberProfile}
        />

    </VStack>
}

import { useCallback, useRef, useState } from 'react'

import { ClubUser } from '../../../domain/model/ClubUser'
import { RoleType } from '../../../domain/model/RoleType'
import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { UdongSearchBar } from '../../components/UdongSearchBar'
import { ClubMemberProfileView } from '../club/info/ClubMemberProfileView'
import { UserItem } from './UserItem'

interface SearchMembersViewProps {
    members: Array<ClubUser>
}

export const SearchMembersView = (props: SearchMembersViewProps) => {
    const { members } = props

    const [showMemberProfile, setShowMemberProfile] = useState(false)
    const [selectedMember, setSelectedMember] = useState<ClubUser | undefined>(undefined)
    const searchRef = useRef<HTMLInputElement | undefined>(null)

    const handleMemberClick = useCallback((user: ClubUser) => {
        setSelectedMember(user)
        setShowMemberProfile(true)
    }, [])

    return <VStack>
        <UdongSearchBar
            inputRef={searchRef}
            onChange={() => {return}}
        />
        <Spacer height={15}/>

        <VStack
            style={{
                overflow: 'scroll',
                maxHeight: 480,
            }}
        >
            {members.map((member, index) => {
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
            isOpen={showMemberProfile}
            setIsOpen={setShowMemberProfile}
            memberId={selectedMember?.user.id ?? -1}
            isAdmin={selectedMember?.role === RoleType.ADMIN}
        />

    </VStack>
}

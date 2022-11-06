import { useState } from 'react'

import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { UdongSearchBar } from '../../components/UdongSearchBar'
import { ClubMemberProfileView } from '../club/info/ClubMemberProfileView'
import { UserItem } from './UserItem'

interface DummyUser {
    name: string
    isMe?: boolean
    isAdmin?: boolean
}

const dummyMe: Array<DummyUser> = [{ name: '이유빈', isAdmin: true, isMe: true }]
const dummyAdminUsers: Array<DummyUser> = [{ name: '이유빈', isAdmin: true }, { name: '고동현', isAdmin: true }, { name: '임유진', isAdmin: true }]
const dummyUserData: Array<DummyUser> = [{ name: '이유빈' }, { name: '이유빈' }, { name: '임유진' }, { name: '박지연' }, { name: '고동현' }]
const dummy = dummyMe.concat(dummyAdminUsers).concat(dummyUserData).concat(dummyUserData)

export const SearchMembersView = () => {
    const [selectedUser, setSelectedUser] = useState<DummyUser>(dummyMe[0])
    const [showMemberProfile, setShowMemberProfile] = useState(false)

    return <VStack>
        <UdongSearchBar/>
        <Spacer height={15}/>

        <VStack
            style={{
                overflow: 'scroll',
                maxHeight: 480,
            }}
        >
            {dummy.map((user, index) => {
                return <VStack
                    key={user.name + index}
                    onClick={() => {
                        setShowMemberProfile(true)
                        setSelectedUser(user)
                    }}
                >
                    <UserItem
                        name={user.name}
                        isMe={user.isMe}
                        isAdmin={user.isAdmin}
                    />
                </VStack>
            })}
        </VStack>

        <ClubMemberProfileView
            isOpen={showMemberProfile}
            setIsOpen={setShowMemberProfile}
            name={selectedUser.name}
            isAdmin={selectedUser.isAdmin}
        />

    </VStack>
}

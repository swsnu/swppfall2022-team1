import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../domain/store'
import { userSelector } from '../../../domain/store/user/UserSelector'
import { userActions } from '../../../domain/store/user/UserSlice'
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
    const dispatch = useDispatch<AppDispatch>()
    const selectedUser = useSelector(userSelector.selectedUser)
    const [showMemberProfile, setShowMemberProfile] = useState(false)

    useEffect(() => {
        dispatch(userActions.getUser(1))
    }, [])

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
                        dispatch(userActions.getUser(0))
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
            user={selectedUser}
        />

    </VStack>
}

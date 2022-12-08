import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { User } from '../../../domain/model/User'
import { AppDispatch } from '../../../domain/store'
import { userSelector } from '../../../domain/store/user/UserSelector'
import { userActions } from '../../../domain/store/user/UserSlice'
import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { UdongImage } from '../../components/UdongImage'
import { UdongModal } from '../../components/UdongModal'
import { UdongSearchBar } from '../../components/UdongSearchBar'
import { UdongText } from '../../components/UdongText'
import close from '../../icons/IcClose.png'
import { UserItem } from './UserItem'

const dummyUserData = ['고동현', '박지연', '임유진', '이유빈']
const dummy: Array<string> = [...dummyUserData].concat(dummyUserData).concat(dummyUserData).concat(dummyUserData)

interface UserListModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    title: string
    users: Array<User>
}

export const UserListModal = (props: UserListModalProps) => {
    const { isOpen, setIsOpen, title, users } = props
    const dispatch = useDispatch<AppDispatch>()
    const userMe = useSelector(userSelector.userMe)
    const searchRef = useRef<HTMLInputElement | undefined>(null)

    useEffect(() => {
        dispatch(userActions.getMyProfile)
    }, [])

    const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setIsOpen(false)
        e.stopPropagation()
    }, [setIsOpen])

    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
                onClick={handleOnClick}
            >
                <UdongImage
                    src={close.src}
                    height={15}
                    width={15}
                    clickable
                />
            </VStack>
            <Spacer height={5}/>

            <UdongText style={'GeneralTitle'}>{title}</UdongText>
            <Spacer height={45}/>

            <UdongSearchBar
                inputRef={searchRef}
                onChange={() => {return}}
            />
            <Spacer height={15}/>

            <VStack
                width={'100%'}
                height={'50vh'}
                alignItems={'start'}
                style={{ overflow: 'scroll', paddingBottom: 15 }}
            >
                <UserItem
                    name={'이유빈'}
                    isMe={true}
                />
                {users.map((user, index) => {
                    return <UserItem
                        name={user.name}
                        isMe={user.id === userMe?.id}
                        key={`${user}/${index}`}
                    />
                })}
            </VStack>
        </VStack>
    </UdongModal>
}

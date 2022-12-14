import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { User } from '../../../domain/model/User'
import { AppDispatch } from '../../../domain/store'
import { userSelector } from '../../../domain/store/user/UserSelector'
import { userActions } from '../../../domain/store/user/UserSlice'
import { useDebouncedSearch } from '../../../utility/useDebouncedSearch'
import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { UdongImage } from '../../components/UdongImage'
import { UdongModal } from '../../components/UdongModal'
import { UdongSearchBar } from '../../components/UdongSearchBar'
import { UdongText } from '../../components/UdongText'
import close from '../../icons/IcClose.png'
import { UserItem } from './UserItem'

interface UserListModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    title: string
    users: Array<User>
}

export const UserListModal = (props: UserListModalProps) => {
    const { isOpen, setIsOpen, title, users } = props
    const dispatch = useDispatch<AppDispatch>()
    const userMe = useSelector(userSelector.userMe) // eslint-disable-line
    const searchRef = useRef<HTMLInputElement | undefined>(null)
    const [searchValue, setSearchValue] = useState('')
    const [keyword, setKeyword] = useState('')
    useDebouncedSearch(searchValue, setKeyword, 300)

    useEffect(() => {
        dispatch(userActions.getMyProfile)
    }, [dispatch])

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
                onChange={() => {
                    setSearchValue(searchRef.current?.value ?? '')
                }}
            />
            <Spacer height={15}/>

            {users.length > 0 ?
                <VStack
                    width={'100%'}
                    height={'50vh'}
                    alignItems={'start'}
                    style={{ overflow: 'scroll', paddingBottom: 15 }}
                >
                    {users.filter((user)=>{return user.name.includes(keyword) || user.email.includes(keyword)}).map((user, index) => {
                        return <UserItem
                            name={user.name}
                            key={`${user}/${index}`}
                            imageKey={user.imageUrl}
                            textClickable={false}
                        />
                    })}
                </VStack>
                :
                <VStack paddingVertical={100}>
                    <UdongText style={'GeneralContent'}>????????? ????????????.</UdongText>
                    <Spacer height={50}/>
                </VStack>
            }
        </VStack>
    </UdongModal>
}

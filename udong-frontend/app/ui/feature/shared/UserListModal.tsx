import { useCallback } from 'react'

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
}

export const UserListModal = (props: UserListModalProps) => {
    const { isOpen, setIsOpen, title } = props

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

            <UdongSearchBar/>
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
                {dummy.map((user, index) => {
                    return <UserItem
                        name={user}
                        key={`${user}/${index}`}
                    />
                })}
            </VStack>
        </VStack>
    </UdongModal>
}

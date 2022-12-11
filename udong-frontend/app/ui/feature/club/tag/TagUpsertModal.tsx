import { useRef, useState } from 'react'

import { useDebouncedSearch } from '../../../../utility/useDebouncedSearch'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongImage } from '../../../components/UdongImage'
import { UdongModal } from '../../../components/UdongModal'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { UdongText } from '../../../components/UdongText'
import close from '../../../icons/IcClose.png'
import edit from '../../../icons/IcPencil.png'
import { UdongColors } from '../../../theme/ColorPalette'
import { UserItem } from '../../shared/UserItem'

const dummyUserData = [{ name: '고동현' }, { name: '박지연' }, { name: '임유진' }, { name: '이유빈' }]
const dummy: Array<{ name: string }> = [...dummyUserData].concat(dummyUserData).concat(dummyUserData).concat(dummyUserData)

interface TagUpsertModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    title: string
}

export const TagUpsertModal = (props: TagUpsertModalProps) => {
    const { isOpen, setIsOpen, title } = props
    const searchRef = useRef<HTMLInputElement | undefined>(null)
    const [searchValue, setSearchValue] = useState('')
    const [keyword, setKeyword] = useState('')

    useDebouncedSearch(searchValue, setKeyword, 300)

    return <UdongModal
        width={'60vw'}
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
            >
                <UdongImage
                    src={close.src}
                    height={15}
                    width={15}
                    onClick={() => setIsOpen(false)}
                    clickable={true}
                />
            </VStack>
            <Spacer height={5}/>

            <HStack alignItems={'center'}>
                <UdongText style={'GeneralTitle'}>{title}</UdongText>
                <Spacer width={15}/>
                <UdongImage
                    src={edit.src}
                    height={20}
                    width={20}
                    clickable={true}
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
                        {dummy.filter((user)=> {
                            return user.name.includes(keyword)
                        }).map((user, index) => {
                            return <UserItem
                                name={user.name}
                                key={`${user}/${index}`}
                            />
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
                    <UdongText style={'GeneralContent'}>선택한 유저 목록(13)</UdongText>
                    <Spacer height={15}/>

                    <VStack
                        width={'100%'}
                        height={'50vh'}
                        alignItems={'start'}
                        style={{ overflow: 'scroll', paddingBottom: 15 }}
                    >
                        {dummy.map((user, index) => {
                            return <UserItem
                                name={user}
                                key={`${user}/${index}`}
                                hasRemoveButton={true}
                            />
                        })}
                    </VStack>
                </VStack>
            </HStack>

            <Spacer height={66}/>
            <UdongButton
                style={'line'}
                onClick={() => {return}}
            >
                저장하기
            </UdongButton>
            <Spacer height={20}/>

        </VStack>
    </UdongModal>
}

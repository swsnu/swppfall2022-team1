import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongImage } from '../../../components/UdongImage'
import { UdongModal } from '../../../components/UdongModal'
import { UdongRadioButton } from '../../../components/UdongRadioButton'
import { UdongText } from '../../../components/UdongText'
import close from '../../../icons/IcClose.png'
import { PostType } from '../post/upsert/create/PostCreateContainer'

interface PostCreateModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export const PostCreateModal = (props: PostCreateModalProps) => {
    const { isOpen, setIsOpen } = props
    const router = useRouter()
    const [postType, setPostType] = useState<PostType>('announcement')

    const handleOnClickCreate = useCallback(() => {
        router.push(`/club/1/post/create/?type=${postType}`)
    }, [router, postType])

    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <VStack
            width={'100%'}
            alignItems={'start'}
        >
            <VStack
                width={'100%'}
                alignItems={'end'}
                style={{ padding: '25px 25px 0 25px' }}
            >
                <UdongImage
                    src={close.src}
                    height={15}
                    width={15}
                    onClick={() => setIsOpen(false)}
                />
            </VStack>
            <Spacer height={7}/>

            <VStack paddingHorizontal={80}>
                <UdongText style={'GeneralTitle'}>게시글 쓰기</UdongText>
                <Spacer height={5}/>
                <UdongText style={'GeneralContent'}>게시글의 종류를 선택하세요 </UdongText>
                <Spacer height={24}/>

                <HStack>
                    <UdongRadioButton
                        text={'일반 공지글'}
                        checked={postType === 'announcement'}
                        onCheck={() => setPostType('announcement')}
                        paddingRight={30}
                    />
                    <UdongRadioButton
                        text={'인원 모집 글'}
                        checked={postType === 'enrollment'}
                        onCheck={() => setPostType('enrollment')}
                        paddingRight={30}
                    />
                    <UdongRadioButton
                        text={'일정 수합 글'}
                        checked={postType === 'scheduling'}
                        onCheck={() => setPostType('scheduling')}
                        paddingRight={30}
                    />
                </HStack>

                <Spacer height={37}/>
                <VStack
                    width={'100%'}
                    alignItems={'center'}
                >
                    <UdongButton
                        style={'fill'}
                        onClick={handleOnClickCreate}
                    >
                        선택하기
                    </UdongButton>
                </VStack>
                <Spacer height={20}/>
            </VStack>
        </VStack>
    </UdongModal>
}

import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { ClickableTag } from './ClickableTag'
import { UserListModal } from './UserListModal'

interface DummyTag {
    text: string
    isIncluded: boolean
}

const dummyTags: Array<DummyTag> = [
    { text: '2022년 겨울 공연 3팀', isIncluded: true },
    { text: '2022년 겨울 공연 2팀', isIncluded: false },
    { text: '우동', isIncluded: false },
]

interface PostItemProps {
    isClubBoard?: boolean
    isEventDetail?: boolean
}

export const PostItem = (props: PostItemProps) => {
    const { isClubBoard = false, isEventDetail = false } = props
    const router = useRouter()
    const [isMemberListOpen, setIsMemberListOpen] = useState(false)
    const [currentTag, setCurrentTag] = useState('')

    const handleOnClickPost = useCallback(() => {
        router.push('/club/1/post/1')
    }, [router])

    return <VStack onClick={handleOnClickPost}>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        <VStack
            paddingVertical={12}
            paddingHorizontal={20}
            gap={12}
        >
            <HStack alignItems={'center'}>
                {!isClubBoard && !isEventDetail &&
                    <HStack>
                        <UdongText style={'ListContentUnderscore'}>
                            단풍
                        </UdongText>
                        <UdongText
                            style={'ListContentS'}
                            margin={'0 4px'}
                        >
                            {'>'}
                        </UdongText>
                    </HStack>
                }
                {!isEventDetail &&
                    <HStack>
                        <UdongText style={'ListContentUnderscore'}>
                            2022년 겨울 공연
                        </UdongText>
                        <Spacer width={30}/>
                    </HStack>
                }

                {dummyTags.map((tag, index) => {
                    return <ClickableTag
                        key={tag.text + index}
                        text={tag.text}
                        isIncluded={tag.isIncluded}
                        onClick={() => {
                            setIsMemberListOpen(true)
                            setCurrentTag(tag.text)
                        }}
                    />
                })}
            </HStack>

            <UdongText style={'ListTitle'}>
                이번 스프린트도 파이팅입니다
            </UdongText>

            <HStack>
                <UdongText
                    style={'ListContentXS'}
                    fontWeight={'bold'}
                    color={UdongColors.Primary}
                >
                    인원 모집 중
                </UdongText>

                <Spacer width={30}/>

                <UdongText style={'ListContentXS'}>
                    5시간 전
                </UdongText>
            </HStack>
        </VStack>

        <UserListModal
            isOpen={isMemberListOpen}
            setIsOpen={setIsMemberListOpen}
            title={currentTag}
        />
    </VStack>
}

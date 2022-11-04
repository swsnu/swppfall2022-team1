import { useState } from 'react'

import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'
import { UserListModal } from '../../shared/UserListModal'
import { TagItem } from './TagItem'

interface TagItemType {
    name: string
    isUserIncluded: boolean
}

const tags: Array<TagItemType> = [
    {
        name: '전체',
        isUserIncluded: true,
    },
    {
        name: '제발 종강 주세요 제발료',
        isUserIncluded: false,
    },
    {
        name: '자일리톨',
        isUserIncluded: false,
    },
    {
        name: '태그 이름 이렇게 길게 지으면 계정 정지시킬겁니다 진짜 주의해주세요 이번만 경고로 넘어가겠습니다 다음부터는 얄짤 없을테...',
        isUserIncluded: false,
    },
]

const dummy = [...tags].concat(tags.slice(1)).concat(tags.slice(1)).concat(tags.slice(1)).concat(tags.slice(1))

export const TagContainer = () => {
    const [showMembers, setShowMembers] = useState(false)
    return <VStack>
        <HStack justifyContent={'end'}>
            <UdongButton
                style={'line'}
                onClick={() => console.log('create post')}
            >
                태그 추가하기
            </UdongButton>
        </HStack>
        <Spacer height={20}/>

        <UdongSearchBar/>
        <Spacer height={8}/>

        {dummy.map((tag, index) => {
            return <VStack
                key={tag.name + index}
                onClick={() => setShowMembers(true)}
            >
                <TagItem
                    name={tag.name}
                    isUserIncluded={tag.isUserIncluded}
                />
            </VStack>
        })}

        <UserListModal
            isOpen={showMembers}
            setIsOpen={setShowMembers}
            title={'2022년 겨울 공연 2팀'}
        />

        <ScrollToTopButton/>
    </VStack>
}

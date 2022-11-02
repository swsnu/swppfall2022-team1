import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { TagItem } from './TagItem'

interface TagItemType {
    name: string
    isUserIncluded: boolean
}

const tags: Array<TagItemType> = [
    {
        name: '제발 종강 주세요 제발료',
        isUserIncluded: false,
    },
    {
        name: '자일리톨',
        isUserIncluded: false,
    },
    {
        name: '치키치키차카차카초코초코초',
        isUserIncluded: false,
    },
    {
        name: '태그 이름 이렇게 길게 지으면 계정 정지시킬겁니다 진짜 주의해주세요 이번만 경고로 넘어가겠습니다 다음부터는 얄짤 없을테...',
        isUserIncluded: false,
    },
    {
        name: '푸룬 말린거 팝니다',
        isUserIncluded: false,
    },
]

export const TagContainer = () => {
    return <VStack>
        <HStack justifyContent={'end'}>
            <UdongButton
                style={'line'}
                onClick={() => console.log('create post')}
                width={120}
            >
                태그 추가하기
            </UdongButton>
        </HStack>
        <Spacer height={20}/>

        <UdongSearchBar/>
        <Spacer height={8}/>

        <TagItem
            name={'전체'}
            isUserIncluded={true}
        />

        <TagItem
            name={'활동'}
            isUserIncluded={true}
        />

        <TagItem
            name={'2022년 겨울 공연 2팀'}
            isUserIncluded={true}
        />

        <TagItem
            name={'뭐든 좋으니 콘서트'}
            isUserIncluded={true}
        />

        <TagItem
            name={'내 칭구들'}
            isUserIncluded={true}
        />

        <TagItem
            name={'2022년 겨울 공연 1팀'}
            isUserIncluded={false}
        />

        <TagItem
            name={'2022년 겨울 공연 3팀'}
            isUserIncluded={false}
        />

        <TagItem
            name={'우동'}
            isUserIncluded={false}
        />

        <TagItem
            name={'우리 동아리가 최고!'}
            isUserIncluded={false}
        />

        {tags.map((tag) => {
            return <TagItem
                key={tag.name}
                name={tag.name}
                isUserIncluded={tag.isUserIncluded}
            />
        })}
    </VStack>
}

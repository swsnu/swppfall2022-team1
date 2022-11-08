import { useRouter } from 'next/router'
import { useState } from 'react'

import { VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongCheckbox } from '../../../../components/UdongCheckbox'
import { UdongModal } from '../../../../components/UdongModal'
import { UdongText } from '../../../../components/UdongText'
import { UdongTextField } from '../../../../components/UdongTextField'
import { CloseModalButton } from '../../../home/mydong/CloseModalButton'

interface UdongModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const SchedulingCloseModal = (props: UdongModalProps) => {
    const { isOpen, setIsOpen } = props
    const [createTag, setCreateTag] = useState<boolean>(false)
    const [saveTime, setSaveTime] = useState<boolean>(false)
    const router = useRouter()
    const { clubId, postId } = router.query

    return (
        <UdongModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <CloseModalButton setIsOpen={setIsOpen}/>
            <VStack
                alignItems={'start'}
                width={'100%'}
                paddingHorizontal={50}
                gap={10}
                style={{ paddingBottom: 30 }}
            >
                <UdongText style={'GeneralTitle'}>일정 수합 마감</UdongText>
                <UdongCheckbox
                    text={'지원한 인원으로 태그 만들기'}
                    checked={createTag}
                    onChange={setCreateTag}
                />
                {createTag && <UdongTextField defaultValue='생성할 태그의 이름을 입력하세요'/>}
                <UdongCheckbox
                    text={'선택한 시간을 행사 시간으로 설정하기'}
                    checked={saveTime}
                    onChange={setSaveTime}
                />
                <UdongText
                    style={'ListContentXS'}
                    marginLeft={30}
                    marginTop={-10}
                >
                    ※ 기존 행사 시간은 삭제됩니다. (수 23:00 ~ 24:00, 목 10:00 ~ 19:00, ...)
                </UdongText>
                <UdongButton
                    style={'line'}
                    alignSelf={'center'}
                    onClick={() => {router.push(`/club/${clubId}/post/${postId}`)}}
                    paddingTop={10}
                >마감하기</UdongButton>
            </VStack>
        </UdongModal>
    )
}

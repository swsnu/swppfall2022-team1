import { useRouter } from 'next/router'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../../../domain/store'
import { clubActions } from '../../../../../domain/store/club/ClubSlice'
import { convertQueryParamToString } from '../../../../../utility/handleQueryParams'
import { VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongCheckbox } from '../../../../components/UdongCheckbox'
import { UdongCloseButton } from '../../../../components/UdongCloseButton'
import { UdongModal } from '../../../../components/UdongModal'
import { UdongText } from '../../../../components/UdongText'
import { UdongTextField } from '../../../../components/UdongTextField'
import { UdongColors } from '../../../../theme/ColorPalette'

interface UdongModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selected: boolean[][]
  inc: number[]
}

export const SchedulingCloseModal = (props: UdongModalProps) => {
    const { isOpen, setIsOpen, inc } = props
    const router = useRouter()
    const { clubId: rawClubId, postId } = router.query
    const clubId = convertQueryParamToString(rawClubId)

    const [createTag, setCreateTag] = useState<boolean>(false)
    const [saveTime, setSaveTime] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement | undefined>(null)
    const [tagName, setTagName] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()

    const buttonDisable = useMemo(() => createTag && !tagName, [createTag, tagName])

    const handleClose = useCallback(() => {
        if(!buttonDisable) {
            if(createTag) { dispatch(clubActions.createClubTag({ clubId: +clubId, tagName, userIds: inc })) }
            if(saveTime) { dispatch(clubActions.editClub())}
            router.push(`/club/${clubId}/post/${postId}`)
        }
    }, [router, clubId, postId, createTag, dispatch, saveTime, buttonDisable, tagName, inc])

    return (
        <UdongModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <UdongCloseButton setIsOpen={setIsOpen}/>
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
                {createTag &&
                    <UdongTextField
                        placeholder={'생성할 태그의 이름을 입력하세요'}
                        inputRef={inputRef}
                        defaultValue={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                    />
                }
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
                    ※ 기존 행사 시간은 삭제됩니다.
                </UdongText>
                <UdongButton
                    color={buttonDisable ? UdongColors.GrayNormal : UdongColors.Primary}
                    disabled={buttonDisable}
                    style={'line'}
                    alignSelf={'center'}
                    onClick={handleClose}
                    paddingTop={10}
                >마감하기</UdongButton>
            </VStack>
        </UdongModal>
    )
}

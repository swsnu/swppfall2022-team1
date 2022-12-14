import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { User } from '../../../../../../domain/model/User'
import { AppDispatch } from '../../../../../../domain/store'
import { enrollmentActions } from '../../../../../../domain/store/post/enrollment/EnrollmentSlice'
import { tagActions } from '../../../../../../domain/store/tag/TagSlice'
import { Spacer } from '../../../../../components/Spacer'
import { HStack, VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongCheckbox } from '../../../../../components/UdongCheckbox'
import { UdongCloseButton } from '../../../../../components/UdongCloseButton'
import { UdongModal } from '../../../../../components/UdongModal'
import { UdongText } from '../../../../../components/UdongText'
import { UdongTextField } from '../../../../../components/UdongTextField'

interface PostCloseModalProps {
    postId: number
    clubId: number
    users: Array<User>
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export const PostCloseModal = (props: PostCloseModalProps) => {
    const { postId, clubId, users, isOpen, setIsOpen } = props
    const dispatch = useDispatch<AppDispatch>()
    const [checked, setChecked] = useState(false)
    const [name, setName] = useState('')
    const inputRef = useRef<HTMLInputElement | undefined>(null)

    const handleCloseEnrollment = useCallback(() => {
        dispatch(enrollmentActions.closeEnrollment(postId))
        if (checked){
            dispatch(tagActions.createTag({ clubId, name, userIdList: users.map((user)=>{return user.id}) }))
        }
        setIsOpen(false)
    }, [checked, dispatch, postId, setIsOpen, clubId, name, users])

    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <VStack
            width={'100%'}
            alignItems={'start'}
        >
            <UdongCloseButton setIsOpen={setIsOpen}/>
            <Spacer height={7}/>

            <VStack
                paddingHorizontal={90}
                width={'100%'}
            >
                <UdongText style={'GeneralTitle'}>인원 모집 마감하기</UdongText>
                <Spacer height={5}/>
                {users.length > 0 ? <VStack>
                    <UdongCheckbox
                        text={'지원한 인원으로 태그 만들기'}
                        checked={checked}
                        onChange={setChecked}
                    />
                    {checked &&
                        <UdongTextField
                            placeholder={'생성할 태그의 이름을 입력하세요'}
                            inputRef={inputRef}
                            defaultValue={name}
                            onChange={() => setName(inputRef.current?.value ?? '')}
                        />
                    }
                </VStack> :
                    <UdongText
                        style={'GeneralContent'}
                    >
                        ※ 지원한 인원이 없습니다.
                    </UdongText>
                }
                <Spacer height={15}/>
                <HStack
                    justifyContent={'center'}
                    width={'100%'}
                >
                    <UdongButton
                        style={'line'}
                        onClick={handleCloseEnrollment}
                        padding={'10px 25px'}
                    >마감하기</UdongButton>
                </HStack>
                <Spacer height={30}/>
            </VStack>
        </VStack>
    </UdongModal>
}

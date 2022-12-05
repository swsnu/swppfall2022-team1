import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../../domain/store'
import { enrollmentSelector } from '../../../../../domain/store/post/enrollment/EnrollmentSelector'
import { enrollmentActions } from '../../../../../domain/store/post/enrollment/EnrollmentSlice'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { UserListModal } from '../../../shared/UserListModal'

interface PostDetailEnrollmentViewProps {
    postId: number
}

export const PostDetailEnrollmentView = (props: PostDetailEnrollmentViewProps) => {
    const { postId } = props
    const dispatch = useDispatch<AppDispatch>()

    const isOpen = useSelector(enrollmentSelector.isOpen)
    const [showEnrolled, setShowEnrolled] = useState(false)

    const handleCloseEnrollment = useCallback(() => {
        dispatch(enrollmentActions.closeEnrollment(postId))
    }, [dispatch, postId])

    return <VStack>
        <Spacer height={60}/>
        <VStack alignItems={'center'}>
            <UdongText
                style={'GeneralContent'}
                color={UdongColors.Primary}
            >
                현재 n명 지원
            </UdongText>
        </VStack>

        <Spacer height={30}/>

        <HStack justifyContent={'space-between'}>
            <HStack
                flex={1}
                style={{ marginLeft: 'auto' }}
            />

            <HStack
                flex={1}
                justifyContent={'center'}
            >
                <UdongButton
                    style={'fill'}
                    onClick={() => setShowEnrolled(true)}
                >
                    현황 보기
                </UdongButton>

                <Spacer width={60}/>

                <UdongButton
                    style={'fill'}
                    color={isOpen ? UdongColors.Primary : UdongColors.GrayNormal}
                    onClick={() => {return}}
                    disabled={!isOpen}
                >
                    지원하기
                </UdongButton>
            </HStack>

            <HStack
                flex={1}
                style={{ marginRight: 'auto' }}
                justifyContent={'end'}
            >
                <UdongButton
                    style={'line'}
                    onClick={handleCloseEnrollment}
                >
                    마감하기
                </UdongButton>
            </HStack>
        </HStack>

        <UserListModal
            isOpen={showEnrolled}
            setIsOpen={setShowEnrolled}
            title={'2022년 겨울 공연 2팀'}
        />
    </VStack>
}

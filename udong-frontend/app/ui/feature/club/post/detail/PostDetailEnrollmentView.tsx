import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../../domain/store'
import { enrollmentSelector } from '../../../../../domain/store/post/enrollment/EnrollmentSelector'
import { enrollmentActions } from '../../../../../domain/store/post/enrollment/EnrollmentSlice'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongModal } from '../../../../components/UdongModal'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { CloseModalButton } from '../../../home/mydong/CloseModalButton'
import { UserListModal } from '../../../shared/UserListModal'

interface PostDetailEnrollmentViewProps {
    postId: number
    isOpen: boolean
}

export const PostDetailEnrollmentView = (props: PostDetailEnrollmentViewProps) => {
    const { postId, isOpen } = props
    const dispatch = useDispatch<AppDispatch>()

    const enrollmentStatus = useSelector(enrollmentSelector.selectedEnrollmentStatus)
    const [showEnrolled, setShowEnrolled] = useState(false)
    const [isClosedModalOpen, setIsClosedModalOpen] = useState(false)

    useEffect(() => {
        dispatch(enrollmentActions.getEnrollmentStatus(postId))
    }, [dispatch, postId])

    const handleEnroll = useCallback(() => {
        if (!isOpen) {
            setIsClosedModalOpen(true)
        }
    }, [isOpen])

    const handleCloseEnrollment = useCallback(() => {
        dispatch(enrollmentActions.closeEnrollment(postId))
    }, [dispatch, postId])

    return <VStack>
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
                    onClick={handleEnroll}
                >
                    지원하기
                </UdongButton>
            </HStack>

            <HStack
                flex={1}
                style={{ marginRight: 'auto' }}
                justifyContent={'end'}
            >
                {isOpen &&
                    <UdongButton
                        style={'line'}
                        onClick={handleCloseEnrollment}
                    >
                        마감하기
                    </UdongButton>
                }
            </HStack>
        </HStack>

        {enrollmentStatus && enrollmentStatus.length > 0 &&
            <UserListModal
                isOpen={showEnrolled}
                setIsOpen={setShowEnrolled}
                users={enrollmentStatus[0].users}
                title={'2022년 겨울 공연 2팀'}
            />
        }

        <UdongModal
            isOpen={isClosedModalOpen}
            setIsOpen={setIsClosedModalOpen}
        >
            <VStack
                width={'100%'}
                alignItems={'center'}
            >
                <CloseModalButton setIsOpen={setIsClosedModalOpen}/>
                <Spacer height={50}/>
                <UdongText style={'GeneralContent'}>이미 마감되었습니다.</UdongText>
                <Spacer height={70}/>
            </VStack>
        </UdongModal>
    </VStack>
}

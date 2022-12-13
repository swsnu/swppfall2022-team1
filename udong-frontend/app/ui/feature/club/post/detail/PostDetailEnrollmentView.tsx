import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../../domain/store'
import { enrollmentSelector } from '../../../../../domain/store/post/enrollment/EnrollmentSelector'
import { enrollmentActions } from '../../../../../domain/store/post/enrollment/EnrollmentSlice'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongCloseButton } from '../../../../components/UdongCloseButton'
import { UdongModal } from '../../../../components/UdongModal'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { UserListModal } from '../../../shared/UserListModal'

interface PostDetailEnrollmentViewProps {
    postId: number
    isOpen: boolean
}

export const PostDetailEnrollmentView = (props: PostDetailEnrollmentViewProps) => {
    const { postId, isOpen } = props
    const dispatch = useDispatch<AppDispatch>()

    const users = useSelector(enrollmentSelector.selectedEnrollmentUsers)
    const hasSuccessfullyClosed = useSelector(enrollmentSelector.hasSuccessfullyClosed)
    const isEnrolled = useSelector(enrollmentSelector.myEnrollmentStatus)

    const [showEnrolledUsers, setShowEnrolledUsers] = useState(false)
    const [isClosedModalOpen, setIsClosedModalOpen] = useState(false)
    const showEnrollButton = isOpen && !hasSuccessfullyClosed && !isEnrolled

    useEffect(() => {
        dispatch(enrollmentActions.resetSelectedEnrollment())
        dispatch(enrollmentActions.getEnrollmentUsers(postId))
        dispatch(enrollmentActions.getMyEnrollmentStatus(postId))
    }, [dispatch, postId])

    const handleEnroll = useCallback(() => {
        if (!isOpen || hasSuccessfullyClosed) {
            setIsClosedModalOpen(true)
        }
    }, [isOpen, hasSuccessfullyClosed])

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
                    onClick={() => setShowEnrolledUsers(true)}
                >
                    현황 보기
                </UdongButton>

                <Spacer width={60}/>

                <UdongButton
                    style={'fill'}
                    color={showEnrollButton ? UdongColors.Primary : UdongColors.GrayNormal}
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
                {showEnrollButton &&
                    <UdongButton
                        style={'line'}
                        onClick={handleCloseEnrollment}
                    >
                        마감하기
                    </UdongButton>
                }
            </HStack>
        </HStack>

        {users &&
            <UserListModal
                isOpen={showEnrolledUsers}
                setIsOpen={setShowEnrolledUsers}
                users={users}
                title={'모집 현황'}
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
                <UdongCloseButton setIsOpen={setIsClosedModalOpen}/>
                <Spacer height={100}/>
                <UdongText style={'GeneralTitle'}>이미 마감되었습니다.</UdongText>
                <Spacer height={150}/>
            </VStack>
        </UdongModal>
    </VStack>
}

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../../domain/store'
import { enrollmentSelector } from '../../../../../domain/store/post/enrollment/EnrollmentSelector'
import { enrollmentActions } from '../../../../../domain/store/post/enrollment/EnrollmentSlice'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongColors } from '../../../../theme/ColorPalette'
import { UserListModal } from '../../../shared/UserListModal'
import { PostCloseModal } from './__test__/PostCloseModal'

interface PostDetailEnrollmentViewProps {
    postId: number
    clubId: number
    isOpen: boolean
}

export const PostDetailEnrollmentView = (props: PostDetailEnrollmentViewProps) => {
    const { postId, clubId, isOpen } = props
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
    }, [dispatch, postId, isClosedModalOpen])

    const handleEnroll = useCallback(() => {
        if (!isOpen || hasSuccessfullyClosed){
            toast.error('마감된 인원 모집글입니다.')
        } else {
            if (isEnrolled) {
                dispatch(enrollmentActions.unparticipateInEnrollment(postId))
            } else {
                dispatch(enrollmentActions.participateInEnrollment(postId))
            }
        }
    }, [isOpen, hasSuccessfullyClosed, isEnrolled, dispatch, postId])

    const handleCloseEnrollment = useCallback(() => {
        setIsClosedModalOpen(true)
    }, [])

    const handleGetEnrolledUsers = useCallback(() => {
        setShowEnrolledUsers(true)
        dispatch(enrollmentActions.getEnrollmentUsers(postId))
    }, [postId, dispatch])

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
                    onClick={handleGetEnrolledUsers}
                >
                    현황 보기
                </UdongButton>

                <Spacer width={60}/>

                <UdongButton
                    style={'fill'}
                    color={showEnrollButton ? UdongColors.Primary : UdongColors.GrayNormal}
                    onClick={handleEnroll}
                >
                    {isOpen && !hasSuccessfullyClosed ? (!isEnrolled ? `지원하기` : `지원 취소하기`) : '지원 마감'}
                </UdongButton>
            </HStack>

            <HStack
                flex={1}
                style={{ marginRight: 'auto' }}
                justifyContent={'end'}
            >
                {isOpen && !hasSuccessfullyClosed &&
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
        {isClosedModalOpen &&
            <PostCloseModal
                postId={postId}
                clubId={clubId}
                users={users ?? []}
                isOpen={isClosedModalOpen}
                setIsOpen={setIsClosedModalOpen}
            />
        }
    </VStack>
}

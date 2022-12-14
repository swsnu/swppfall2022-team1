import { signOut } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { User } from '../../../domain/model/User'
import { AppDispatch } from '../../../domain/store'
import { authActions } from '../../../domain/store/auth/AuthSlice'
import { userSelector } from '../../../domain/store/user/UserSelector'
import { userActions } from '../../../domain/store/user/UserSlice'
import { useImage } from '../../../hooks/useImage'
import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongErrorModal } from '../../components/UdongErrorModal'
import { UdongFloatingContainer } from '../../components/UdongFloatingContainer'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { LeaveModal } from '../shared/LeaveModal'
import { ProfileView } from '../shared/ProfileView'

interface MyProfileViewProps {
    me: User
}

export const MyProfileView = (props: MyProfileViewProps) => {
    const { me } = props
    const { id, name, email, imageUrl, timeTable } = me
    const dispatch = useDispatch<AppDispatch>()

    const error = useSelector(userSelector.errors).deleteAccountError

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)

    useEffect(() => {
        if (!error) {
            setIsErrorModalOpen(true)
        }
    }, [error])

    const handleEditNickname = useCallback((name: string) => {
        dispatch(userActions.editMyProfile({
            ...me,
            name,
        }))
    }, [dispatch, me])

    const handleDeleteAccount = useCallback(async () => {
        const response = await dispatch(userActions.deleteAccount())
        if (response.type === `${userActions.deleteAccount.typePrefix}/fulfilled`) {
            const logoutResponse = await dispatch(authActions.logout())
            if (logoutResponse.type === `${authActions.logout.typePrefix}/fulfilled`) {
                signOut({ redirect: false })
            }
        }
        setIsLeaveModalOpen(false)
    }, [dispatch])

    const handleCloseErrorModal = useCallback(() => {
        setIsErrorModalOpen(false)
        dispatch(userActions.resetErrors())
    }, [dispatch])

    const renderDeleteAccountButton = useCallback(() => {
        return <HStack onClick={() => setIsLeaveModalOpen(true)}>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.GrayNormal}
            >
                탈퇴하기
            </UdongText>
        </HStack>
    }, [])

    return <UdongFloatingContainer
        height={560}
        padding={'35px 50px'}
        width={'400px'}
    >
        <UdongText style={'GeneralTitle'}>유저 프로필</UdongText>
        <Spacer height={90}/>

        <ProfileView
            userId={id}
            name={name}
            email={email}
            image={useImage(imageUrl ?? '')}
            timeTable={timeTable}
            showCameraButton={true}
            onClickEditNameButton={handleEditNickname}
            bottomItem={
                <HStack>
                    {renderDeleteAccountButton()}
                </HStack>
            }
        />

        {error &&
            <UdongErrorModal
                message={error.message}
                isOpen={isErrorModalOpen}
                setIsOpen={handleCloseErrorModal}
            />
        }

        <LeaveModal
            leaveObjectText={'우동'}
            isOpen={isLeaveModalOpen}
            setIsOpen={setIsLeaveModalOpen}
            onClickLeave={handleDeleteAccount}
        />
    </UdongFloatingContainer>
}

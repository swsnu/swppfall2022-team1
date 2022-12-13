import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Club } from '../../../../domain/model/Club'
import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions, ClubErrorType } from '../../../../domain/store/club/ClubSlice'
import { userSelector } from '../../../../domain/store/user/UserSelector'
import { userActions } from '../../../../domain/store/user/UserSlice'
import { isAllObjectFieldsUndefined } from '../../../../utility/helperTypes'
import { Spacer } from '../../../components/Spacer'
import { HStack } from '../../../components/Stack'
import { UdongErrorModal } from '../../../components/UdongErrorModal'
import { UdongFloatingContainer } from '../../../components/UdongFloatingContainer'
import { UdongText } from '../../../components/UdongText'
import { UdongColors } from '../../../theme/ColorPalette'
import { DeleteModal } from '../../shared/DeleteModal'
import { ProfileView } from '../../shared/ProfileView'

const getErrorMessage = (errors: ClubErrorType): string => {
    if (errors.deleteError) {
        return errors.deleteError.message
    } else if (errors.editError) {
        return errors.editError.message
    } else if (errors.leaveClubError) {
        return errors.leaveClubError.message
    } else {
        return ''
    }
}

interface ClubProfileViewProps {
    club: Club
}

export const ClubProfileView = (props: ClubProfileViewProps) => {
    const { club } = props
    const { name, code, id } = club
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const errors = useSelector(clubSelector.errors)
    const isAdmin = useSelector(userSelector.isAdmin)

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    useEffect(() => {
        dispatch(userActions.getMyClubProfile(id))
    }, [dispatch, id])

    useEffect(() => {
        if (!isAllObjectFieldsUndefined(errors)) {
            setIsErrorModalOpen(true)
        }
    }, [errors])

    const handleEditClub = useCallback((newName: string) => {
        if (newName && newName !== name) {
            dispatch(clubActions.editClub({
                clubId: id,
                club: { ...club, name: newName },
            }))
        }
    }, [club, id, name, dispatch])

    const handleDeleteClub = useCallback(async () => {
        setIsDeleteModalOpen(false)
        const response = await dispatch(clubActions.deleteClub(id))
        if (response.type === `${clubActions.deleteClub.typePrefix}/fulfilled`) {
            router.push(`/`)
        }
    }, [dispatch, router, id])

    const handleLeaveClub = useCallback(async () => {
        const response = await dispatch(clubActions.leaveClub(id))
        if (response.type === `${clubActions.leaveClub.typePrefix}/fulfilled`) {
            router.push(`/`)
        }
    }, [dispatch, router, id])

    const handleCloseErrorModal = useCallback(() => {
        setIsErrorModalOpen(false)
        dispatch(clubActions.resetErrors())
    }, [dispatch])

    const renderLeaveClubButton = useCallback(() => {
        return <HStack onClick={handleLeaveClub}>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.GrayNormal}
                cursor={'pointer'}
            >
                탈퇴하기
            </UdongText>
        </HStack>
    }, [handleLeaveClub])

    const renderDeleteClubButton = useCallback(() => {
        if (!isAdmin) {
            return null
        }
        return <HStack onClick={() => setIsDeleteModalOpen(true)}>
            <Spacer width={60}/>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.Warning}
                cursor={'pointer'}
            >
               삭제하기
            </UdongText>
        </HStack>
    }, [isAdmin])

    return <UdongFloatingContainer
        width={'calc(50% - 50px)'}
        height={'560px'}
        padding={'35px 50px'}
    >
        <UdongText style={'GeneralTitle'}>동아리 프로필</UdongText>
        <Spacer height={90}/>

        <ProfileView
            name={name}
            code={code}
            showCameraButton={isAdmin}
            onClickEditNameButton={isAdmin ? handleEditClub : undefined}
            onRefresh={isAdmin ? () => {return} : undefined}
            bottomItem={
                <HStack>
                    {renderLeaveClubButton()}
                    {renderDeleteClubButton()}
                </HStack>
            }
        />

        {!isAllObjectFieldsUndefined(errors) &&
            <UdongErrorModal
                message={getErrorMessage(errors)}
                isOpen={isErrorModalOpen}
                setIsOpen={handleCloseErrorModal}
            />
        }

        <DeleteModal
            deleteObjectText={'동아리'}
            warningText={'경고 문구'}
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
            onClickDelete={handleDeleteClub}
        />
    </UdongFloatingContainer>
}

import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Club } from '../../../../domain/model/Club'
import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions, ClubEditAPIErrorType } from '../../../../domain/store/club/ClubSlice'
import { Spacer } from '../../../components/Spacer'
import { HStack } from '../../../components/Stack'
import { UdongErrorModal } from '../../../components/UdongErrorModal'
import { UdongFloatingContainer } from '../../../components/UdongFloatingContainer'
import { UdongText } from '../../../components/UdongText'
import { UdongColors } from '../../../theme/ColorPalette'
import { ProfileView } from '../../shared/ProfileView'

const getErrorMessage = (error: ClubEditAPIErrorType): string => {
    if (error === 'is_not_admin') {
        return '관리자 권한이 필요합니다.'
    } else if (error === 'incorrect_fields') {
        return '모든 필드를 알맞게 입력해주세요.'
    } else {
        return '오류가 발생했습니다.'
    }
}

interface ClubProfileViewProps {
    club: Club
    onClickDelete: (showDeleteModal: boolean) => void
}

export const ClubProfileView = (props: ClubProfileViewProps) => {
    const { club, onClickDelete } = props
    const { name, code, id } = club
    const dispatch = useDispatch<AppDispatch>()
    const errors = useSelector(clubSelector.errors)
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

    useEffect(() => {
        if (errors && errors.editError) {
            setIsErrorModalOpen(true)
        }
    }, [errors])

    const handleEditClub = useCallback((newName: string) => {
        if (newName) {
            dispatch(clubActions.editClub({
                clubId: id,
                club: { ...club, name: newName },
            }))
        }
    }, [club, id, dispatch])

    const handleCloseErrorModal = useCallback(() => {
        setIsErrorModalOpen(false)
        dispatch(clubActions.resetErrors())
    }, [dispatch])

    const renderLeaveClubButton = useCallback(() => {
        return <HStack onClick={() => {return}}>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.GrayNormal}
            >
                탈퇴하기
            </UdongText>
        </HStack>
    }, [])

    const renderDeleteClubButton = useCallback(() => {
        return <HStack onClick={() => onClickDelete(true)}>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.Warning}
            >
               삭제하기
            </UdongText>
        </HStack>
    }, [onClickDelete])

    return <UdongFloatingContainer
        width={'calc(50% - 50px)'}
        height={'fit-content'}
        padding={'35px 50px'}
    >
        <UdongText style={'GeneralTitle'}>동아리 프로필</UdongText>
        <Spacer height={90}/>

        <ProfileView
            name={name}
            code={code}
            showCameraButton={true}
            onClickEditNameButton={handleEditClub}
            bottomItem={
                <HStack>
                    {renderLeaveClubButton()}
                    <Spacer width={60}/>
                    {renderDeleteClubButton()}
                </HStack>
            }
        />

        {errors && errors.editError &&
            <UdongErrorModal
                message={getErrorMessage(errors.editError)}
                isOpen={isErrorModalOpen}
                setIsOpen={handleCloseErrorModal}
            />
        }
    </UdongFloatingContainer>
}

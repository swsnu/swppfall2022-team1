import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Club } from '../../../../domain/model/Club'
import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions, ClubErrorType } from '../../../../domain/store/club/ClubSlice'
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
    if (errors?.deleteError === 'is_not_admin' || errors?.editError === 'is_not_admin') {
        return '관리자 권한이 필요합니다.'
    } else if (errors?.editError === 'incorrect_fields') {
        return '모든 필드를 알맞게 입력해주세요.'
    } else {
        return '오류가 발생했습니다.'
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
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
        const response = await dispatch(clubActions.deleteClub(id))
        if (response.type === `${clubActions.deleteClub.typePrefix}/fulfilled`) {
            router.push(`/`)
        }
    }, [dispatch, router, id])

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
        return <HStack onClick={() => setIsDeleteModalOpen(true)}>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.Warning}
            >
               삭제하기
            </UdongText>
        </HStack>
    }, [])

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

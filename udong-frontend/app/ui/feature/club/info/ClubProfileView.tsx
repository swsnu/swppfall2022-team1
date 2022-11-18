import { useCallback } from 'react'

import { Club } from '../../../../domain/model/Club'
import { Spacer } from '../../../components/Spacer'
import { HStack } from '../../../components/Stack'
import { UdongFloatingContainer } from '../../../components/UdongFloatingContainer'
import { UdongText } from '../../../components/UdongText'
import { UdongColors } from '../../../theme/ColorPalette'
import { ProfileView } from '../../shared/ProfileView'

interface ClubProfileViewProps {
    club?: Club
    onClickDelete: (showDeleteModal: boolean) => void
}

export const ClubProfileView = (props: ClubProfileViewProps) => {
    const { club, onClickDelete } = props
    const { name = '이름 없음', code = '코드 없음' } = club ?? {}

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
            showEditButton={true}
            showAccessCode={true}
            bottomItem={
                <HStack>
                    {renderLeaveClubButton()}
                    <Spacer width={60}/>
                    {renderDeleteClubButton()}
                </HStack>
            }
        />
    </UdongFloatingContainer>
}

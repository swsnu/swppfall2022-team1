import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RoleType } from '../../../../domain/model/RoleType'
import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions } from '../../../../domain/store/club/ClubSlice'
import { userActions } from '../../../../domain/store/user/UserSlice'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongImage } from '../../../components/UdongImage'
import { UdongLoader } from '../../../components/UdongLoader'
import { UdongModal } from '../../../components/UdongModal'
import { UdongText } from '../../../components/UdongText'
import close from '../../../icons/IcClose.png'
import { UdongColors } from '../../../theme/ColorPalette'
import { ProfileView } from '../../shared/ProfileView'

interface ClubMemberProfileViewProps {
    clubId: number
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export const ClubMemberProfileView = (props: ClubMemberProfileViewProps) => {
    const { clubId, isOpen, setIsOpen } = props
    const dispatch = useDispatch<AppDispatch>()

    const member = useSelector(clubSelector.selectedMember)

    useEffect(() => {
        if (member) {
            dispatch(userActions.getUser(member.user.id))
        }
    }, [dispatch, member])

    const handleChangeMemberRole = useCallback(() => {
        if (member) {
            dispatch(clubActions.changeMemberRole({ clubId, userId: member.user.id }))
        }
    }, [dispatch, clubId, member])

    const renderAssignMemberButton = useCallback(() => {
        return <HStack
            onClick={handleChangeMemberRole}
            paddingVertical={30}
        >
            <UdongText
                style={'ListContentS'}
                color={UdongColors.GrayNormal}
            >
                일반 멤버로 전환
            </UdongText>
        </HStack>
    }, [handleChangeMemberRole])

    const renderAssignAdminButton = useCallback(() => {
        return <HStack onClick={handleChangeMemberRole}>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.GrayNormal}
            >
                관리자로 전환
            </UdongText>
        </HStack>
    }, [handleChangeMemberRole])

    const renderRemoveMemberButton = useCallback(() => {
        return <HStack onClick={() => {return}}>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.Warning}
            >
                내보내기
            </UdongText>
        </HStack>
    }, [])

    const renderBottomButtons = useCallback(() => {
        if (member?.role === RoleType.ADMIN) {
            return renderAssignMemberButton()
        } else {
            return <HStack paddingVertical={30}>
                {renderAssignAdminButton()}
                <Spacer width={60}/>
                {renderRemoveMemberButton()}
            </HStack>
        }
    }, [member, renderAssignAdminButton, renderRemoveMemberButton, renderAssignMemberButton])

    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        {!member ?
            <VStack height={530}>
                <UdongLoader/>
            </VStack>
            :
            <VStack width={'100%'}>
                <HStack
                    justifyContent={'space-between'}
                    paddingHorizontal={25}
                    paddingVertical={25}
                >
                    <HStack
                        paddingVertical={10}
                        paddingHorizontal={25}
                    >
                        <UdongText style={'GeneralTitle'}>유저 프로필</UdongText>
                    </HStack>

                    <HStack
                        style={{ padding: '0 0 20px 20px' }}
                        onClick={() => setIsOpen(false)}
                    >
                        <UdongImage
                            src={close.src}
                            height={15}
                            width={15}
                        />
                    </HStack>
                </HStack>
                <Spacer height={90}/>

                <ProfileView
                    name={member.user.name}
                    showAdminBadge={member.role === RoleType.ADMIN}
                    bottomItem={renderBottomButtons()}
                />
            </VStack>}
    </UdongModal>
}

import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { userSelector } from '../../../../domain/store/user/UserSelector'
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
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    memberId: number
    isAdmin: boolean
}

export const ClubMemberProfileView = (props: ClubMemberProfileViewProps) => {
    const { isOpen, setIsOpen, memberId, isAdmin } = props
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(userSelector.selectedUser)

    useEffect(() => {
        dispatch(userActions.getUser(memberId))
    }, [dispatch, memberId])

    const renderAssignMemberButton = useCallback(() => {
        return <HStack
            onClick={() => {return}}
            paddingVertical={30}
        >
            <UdongText
                style={'ListContentS'}
                color={UdongColors.GrayNormal}
            >
                일반 멤버로 전환
            </UdongText>
        </HStack>
    }, [])

    const renderAssignAdminButton = useCallback(() => {
        return <HStack onClick={() => {return}}>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.GrayNormal}
            >
                관리자로 전환
            </UdongText>
        </HStack>
    }, [])

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
        if (isAdmin) {
            return renderAssignMemberButton()
        } else {
            return <HStack paddingVertical={30}>
                {renderAssignAdminButton()}
                <Spacer width={60}/>
                {renderRemoveMemberButton()}
            </HStack>
        }
    }, [isAdmin, renderAssignAdminButton, renderRemoveMemberButton, renderAssignMemberButton])

    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        {!user ? <UdongLoader/> :
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
                    name={user.name}
                    showAdminBadge={isAdmin}
                    bottomItem={renderBottomButtons()}
                />
            </VStack>}
    </UdongModal>
}

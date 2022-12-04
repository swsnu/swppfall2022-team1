import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { User } from '../../../domain/model/User'
import { AppDispatch } from '../../../domain/store'
import { userActions } from '../../../domain/store/user/UserSlice'
import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongFloatingContainer } from '../../components/UdongFloatingContainer'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { ProfileView } from '../shared/ProfileView'

interface MyProfileViewProps {
    me: User
}

export const MyProfileView = (props: MyProfileViewProps) => {
    const { me } = props
    const { name, email } = me
    const dispatch = useDispatch<AppDispatch>()

    const handleEditNickname = useCallback((name: string) => {
        dispatch(userActions.editMyProfile({
            ...me,
            name,
        }))
        console.log('hello world')
    }, [dispatch, me])

    const renderDeleteAccountButton = useCallback(() => {
        return <HStack onClick={() => {return}}>
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
            name={name}
            email={email}
            showCameraButton={true}
            onClickEditNameButton={handleEditNickname}
            bottomItem={
                <HStack>
                    {renderDeleteAccountButton()}
                </HStack>
            }
        />
    </UdongFloatingContainer>
}

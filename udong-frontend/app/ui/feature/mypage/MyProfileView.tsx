import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongFloatingContainer } from '../../components/UdongFloatingContainer'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { ProfileView } from '../shared/ProfileView'

interface MyProfileViewProps {
    name: string
    email: string
}

export const MyProfileView = (props: MyProfileViewProps) => {
    const { name, email } = props

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
            showEditButton={true}
            bottomItem={
                <HStack>
                    {renderDeleteAccountButton()}
                </HStack>
            }
        />
    </UdongFloatingContainer>
}

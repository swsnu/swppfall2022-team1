import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongFloatingContainer } from '../../components/UdongFloatingContainer'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { ProfileView } from '../shared/ProfileView'

export const MyProfileView = () => {
    const renderDeleteAccountButton = useCallback(() => {
        return <HStack onClick={() => console.log('우동 영구 탈퇴~')}>
            <UdongText
                style={'ListContentS'}
                color={UdongColors.GrayNormal}
            >
                탈퇴하기
            </UdongText>
        </HStack>
    }, [])

    return <UdongFloatingContainer
        width={'calc(50% - 50px)'}
        height={560}
        padding={'35px 50px'}
    >
        <UdongText style={'GeneralTitle'}>유저 프로필</UdongText>
        <Spacer height={90}/>

        <ProfileView
            name={'이유빈'}
            showEditButton={true}
            showGoogleAccount={true}
            bottomItem={
                <HStack>
                    {renderDeleteAccountButton()}
                </HStack>
            }
        />
    </UdongFloatingContainer>
}

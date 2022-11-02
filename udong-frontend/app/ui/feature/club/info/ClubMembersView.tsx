import { Spacer } from '../../../components/Spacer'
import { UdongFloatingContainer } from '../../../components/UdongFloatingContainer'
import { UdongText } from '../../../components/UdongText'
import { SearchMembersView } from '../../shared/SearchMembersView'

export const ClubMembersView = () => {
    return <UdongFloatingContainer
        width={'calc(50% - 50px)'}
        height={'fit-content'}
        padding={'35px 50px'}
    >
        <UdongText style={'GeneralTitle'}>동아리 인원</UdongText>
        <Spacer height={30}/>

        <SearchMembersView/>
    </UdongFloatingContainer>
}

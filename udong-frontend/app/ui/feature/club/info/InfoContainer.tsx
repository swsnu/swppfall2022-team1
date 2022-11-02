import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { ClubMembersView } from './ClubMembersView'
import { ClubProfileView } from './ClubProfileView'

export const InfoContainer = () => {
    return <VStack justifyContent={'center'}>
        <Spacer height={50}/>

        <HStack
            justifyContent={'center'}
            alignItems={'center'}
        >
            <ClubProfileView/>

            <Spacer width={50}/>

            <ClubMembersView/>
        </HStack>
    </VStack>
}

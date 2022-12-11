import { useSelector } from 'react-redux'

import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { ClubMembersView } from './ClubMembersView'
import { ClubProfileView } from './ClubProfileView'

interface InfoContainerProps {
    clubId: number
}

export const InfoContainer = (props: InfoContainerProps) => {
    const { clubId } = props
    const club = useSelector(clubSelector.selectedClub)

    if (!club) {
        return null
    }

    if (!club) {
        return null
    }

    return <VStack justifyContent={'center'}>
        <Spacer height={50}/>

        <HStack
            justifyContent={'center'}
            alignItems={'center'}
        >
            <ClubProfileView club={club}/>

            <Spacer width={50}/>

            <ClubMembersView clubId={clubId}/>
        </HStack>

        <Spacer height={20}/>
    </VStack>
}

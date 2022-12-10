import { useState } from 'react'
import { useSelector } from 'react-redux'

import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { DeleteModal } from '../../shared/DeleteModal'
import { ClubMembersView } from './ClubMembersView'
import { ClubProfileView } from './ClubProfileView'

interface InfoContainerProps {
    clubId: number
}

export const InfoContainer = (props: InfoContainerProps) => {
    const { clubId } = props
    const club = useSelector(clubSelector.selectedClub)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    if (!club) {
        return null
    }

    return <VStack justifyContent={'center'}>
        <Spacer height={50}/>

        <HStack
            justifyContent={'center'}
            alignItems={'center'}
        >
            <ClubProfileView
                club={club}
                onClickDelete={setShowDeleteModal}
            />

            <Spacer width={50}/>

            <ClubMembersView clubId={clubId}/>
        </HStack>

        <Spacer height={20}/>

        <DeleteModal
            deleteObjectText={'게시글'}
            warningText={'경고 문구'}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
            onClickDelete={() => {return}}
        />
    </VStack>
}

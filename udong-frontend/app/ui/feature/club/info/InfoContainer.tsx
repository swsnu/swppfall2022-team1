import { useState } from 'react'

import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { DeleteModal } from '../../shared/DeleteModal'
import { ClubMembersView } from './ClubMembersView'
import { ClubProfileView } from './ClubProfileView'

export const InfoContainer = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    return <VStack justifyContent={'center'}>
        <Spacer height={50}/>

        <HStack
            justifyContent={'center'}
            alignItems={'center'}
        >
            <ClubProfileView onClickDelete={setShowDeleteModal}/>

            <Spacer width={50}/>

            <ClubMembersView/>
        </HStack>

        <Spacer height={20}/>

        <DeleteModal
            deleteObjectText={'게시글'}
            warningText={'경고 문구'}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
        />
    </VStack>
}

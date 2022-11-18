import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions } from '../../../../domain/store/club/ClubSlice'
import { convertQueryParamToString } from '../../../../utility/handleQueryParams'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { DeleteModal } from '../../shared/DeleteModal'
import { ClubMembersView } from './ClubMembersView'
import { ClubProfileView } from './ClubProfileView'

export const InfoContainer = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const { clubId } = router.query
    const club = useSelector(clubSelector.selectedClub)

    useEffect(() => {
        dispatch(clubActions.getClub(parseInt(convertQueryParamToString(clubId))))
    }, [])

    const [showDeleteModal, setShowDeleteModal] = useState(false)

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

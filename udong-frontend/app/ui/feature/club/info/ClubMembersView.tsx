import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions } from '../../../../domain/store/club/ClubSlice'
import { Spacer } from '../../../components/Spacer'
import { UdongFloatingContainer } from '../../../components/UdongFloatingContainer'
import { UdongText } from '../../../components/UdongText'
import { SearchMembersView } from '../../shared/SearchMembersView'

interface ClubMembersViewProps {
    clubId: number
}

export const ClubMembersView = (props: ClubMembersViewProps) => {
    const { clubId } = props
    const dispatch = useDispatch<AppDispatch>()
    const members = useSelector(clubSelector.members)

    useEffect(() => {
        dispatch(clubActions.getClubMembers(clubId))
    }, [dispatch, clubId])

    return <UdongFloatingContainer
        width={'calc(50% - 50px)'}
        height={'560px'}
        padding={'35px 50px'}
    >
        <UdongText style={'GeneralTitle'}>동아리 인원</UdongText>
        <Spacer height={30}/>

        <SearchMembersView
            clubId={clubId}
            members={members}
        />
    </UdongFloatingContainer>
}

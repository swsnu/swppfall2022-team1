import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions } from '../../../../domain/store/club/ClubSlice'
import { VStack } from '../../../components/Stack'
import { UdongImage } from '../../../components/UdongImage'
import dong from '../../../icons/IcDong.png'
import plus from '../../../icons/IcPlus.png'
import { UdongColors } from '../../../theme/ColorPalette'
import { AddClubModal } from './AddClubModal'
import { ClubItem } from './ClubItem'
import { CreateClubModal } from './CreateClubModal'
import { RegisterClubModal } from './RegisterClubModal'

export const MyDongContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const myClubs = useSelector(clubSelector.myClubs)

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    useEffect(() => {
        dispatch(clubActions.getMyClubs())
    }, [dispatch])

    const handleOnRegisterClubClick = useCallback(() => {
        setIsAddModalOpen(false)
        setIsRegisterModalOpen(true)
    }, [])

    const handleOnCreateClubClick = useCallback(() => {
        setIsAddModalOpen(false)
        setIsCreateModalOpen(true)
    }, [])

    return <VStack>
        <ClubGridLayout>
            <AddClubButton onClick={() => setIsAddModalOpen(true)}>
                <UdongImage
                    src={plus.src}
                    height={30}
                    width={30}
                    clickable={true}
                />
            </AddClubButton>

            <AddClubModal
                isOpen={isAddModalOpen}
                setIsOpen={setIsAddModalOpen}
                onRegisterClubClick={handleOnRegisterClubClick}
                onCreateClubClick={handleOnCreateClubClick}
            />

            <RegisterClubModal
                isOpen={isRegisterModalOpen}
                setIsOpen={setIsRegisterModalOpen}
            />
            <CreateClubModal
                isOpen={isCreateModalOpen}
                setIsOpen={setIsCreateModalOpen}
            />

            {myClubs.map((item, index) => {
                return <ClubItem
                    key={`${item.name} / ${index}`}
                    imageSrc={dong.src}
                    club={item}
                />
            })}
        </ClubGridLayout>
    </VStack>
}

const ClubGridLayout = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    justifyItems: 'center',
    alignItems: 'center',
    rowGap: 12,
    columnGap: 8,
})

const AddClubButton = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: UdongColors.GrayBright,
    borderRadius: 30,
    cursor: 'pointer',
})

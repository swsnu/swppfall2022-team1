import styled from '@emotion/styled'
import { useCallback, useState } from 'react'

import { VStack } from '../../../components/Stack'
import { UdongImage } from '../../../components/UdongImage'
import dummy from '../../../icons/IcDong.png'
import plus from '../../../icons/IcPlus.png'
import waffle from '../../../icons/IcWaffle.png'
import { UdongColors } from '../../../theme/ColorPalette'
import { AddClubModal } from './AddClubModal'
import { ClubItem } from './ClubItem'
import { CreateClubModal } from './CreateClubModal'
import { RegisterClubModal } from './RegisterClubModal'

export const MyDongView = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

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

            <ClubItem
                imageSrc={dummy.src}
                name={'우리 동아리'}
            />
            <ClubItem
                imageSrc={waffle.src}
                name={'와플 스튜디오'}
            />
            <ClubItem
                imageSrc={dummy.src}
                name={'우리 동아리'}
            />
            <ClubItem
                imageSrc={waffle.src}
                name={'와플 스튜디오'}
            />
            <ClubItem
                imageSrc={dummy.src}
                name={'우리 동아리'}
            />
            <ClubItem
                imageSrc={waffle.src}
                name={'와플 스튜디오'}
            />
            <ClubItem
                imageSrc={dummy.src}
                name={'우리 동아리'}
            />
            <ClubItem
                imageSrc={waffle.src}
                name={'와플 스튜디오'}
            />
            <ClubItem
                imageSrc={dummy.src}
                name={'우리 동아리'}
            />
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
})

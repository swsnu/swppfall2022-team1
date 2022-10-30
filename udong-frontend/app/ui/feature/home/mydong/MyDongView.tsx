import styled from '@emotion/styled'

import { VStack } from '../../../components/Stack'
import { UdongImage } from '../../../components/UdongImage'
import dummy from '../../../icons/IcDong.png'
import plus from '../../../icons/IcPlus.png'
import waffle from '../../../icons/IcWaffle.png'
import { UdongColors } from '../../../theme/ColorPalette'
import { ClubItem } from './ClubItem'

export const MyDongView = () => {
    return <VStack>
        <ClubGridLayout>
            <AddClubButton>
                <UdongImage
                    src={plus.src}
                    height={30}
                    width={30}
                />
            </AddClubButton>

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

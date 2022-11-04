import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongChip } from '../../../components/UdongChip'
import { UdongImage } from '../../../components/UdongImage'
import { UdongText } from '../../../components/UdongText'
import edit from '../../../icons/IcPencil.png'
import trash from '../../../icons/IcTrash.png'
import { UdongColors } from '../../../theme/ColorPalette'

// TODO: 나중에는 tag 타입 전체를 props로 넘기는게 좋을듯
interface TagItemProps {
    name: string
    isUserIncluded: boolean
}

export const TagItem = (props: TagItemProps) => {
    const { name, isUserIncluded } = props
    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        <HStack
            paddingVertical={14}
            justifyContent={'space-between'}
        >
            <UdongChip
                style={isUserIncluded ? 'primary' : 'gray'}
                onClick={() => console.log('tag!')}
                text={name}
            />

            <HStack>
                <Spacer width={30}/>
                <UdongText
                    style={'ListContentS'}
                    whiteSpace={'nowrap'}
                >
                    생성일: 2012.04.13
                </UdongText>
                <Spacer width={30}/>
                <UdongText
                    style={'ListContentS'}
                    whiteSpace={'nowrap'}
                >
                    수정일: 2022.11.01
                </UdongText>

                <Spacer width={30}/>
                <UdongImage
                    src={edit.src}
                    height={20}
                    width={20}
                />
                <Spacer width={10}/>
                <UdongImage
                    src={trash.src}
                    height={20}
                    width={20}
                />
            </HStack>
        </HStack>
    </VStack>
}

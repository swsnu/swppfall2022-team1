import { Dispatch, SetStateAction } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'

interface EventInputViewProps {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
}

export const EventInputView = ({ title, setTitle } : EventInputViewProps) => {

    return <VStack paddingVertical={45}>
        <HStack alignItems={'center'}>
            <UdongText style={'GeneralTitle'}>행사 제목</UdongText>
            <Spacer width={30}/>
            <input
                type={'text'}
                value={title}
                placeholder={'제목을 입력해주세요'}
                onChange={(e) => {setTitle(e.target.value)}}
                style={{
                    outline: UdongColors.GrayBright,
                    border: `1px solid ${UdongColors.GrayNormal}`,
                    fontFamily: 'sans-serif',
                    fontSize: 14,
                    flexGrow: 1,
                    padding: 10,
                }}
            />
        </HStack>
    </VStack>
}

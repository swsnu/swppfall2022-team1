import { useRouter } from 'next/router'
import { useState } from 'react'

import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { EventAdditionalFieldsView } from '../EventAdditionalFieldsView'
import { EventInputView } from '../EventInputView'

export const EventEditContainer = () => {
    const [title, setTitle] = useState('컴공 MT')
    const router = useRouter()

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'행사 수정하기'}
            onGoBack={() => router.back()}
            rightButtons={
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={() => {return}}
                >
                    저장하기
                </UdongButton>
            }
        />
        <EventInputView
            title={title}
            setTitle={setTitle}
        />
        <EventAdditionalFieldsView isEdit={true}/>
    </VStack>}
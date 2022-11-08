import { useRouter } from 'next/router'
import { useState } from 'react'

import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { EventAdditionalFieldsView } from '../EventAdditionalFieldsView'
import { EventInputView } from '../EventInputView'

export const EventCreateContainer = () => {
    const router = useRouter()
    const [title, setTitle] = useState<string>('')

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'행사 만들기'}
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
        <EventAdditionalFieldsView edit={false}/>
    </VStack>
}

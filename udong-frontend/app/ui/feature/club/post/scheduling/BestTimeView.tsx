import { timeToStr } from '../../../../../utility/functions'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { BestType } from './SchedulingHooks'

interface BestTimeViewProps {
  best: BestType[]
}

export const BestTimeView = (props: BestTimeViewProps) => {
    const { best } = props
    return (
        <VStack>
            <UdongText style={'GeneralTitle'}>Best 시간대</UdongText>
            {best.map(({ cnt,  day, time }, idx) => (
                <HStack key={idx}>
                    <UdongText
                        style={'GeneralContent'}
                        width={40}
                    >{cnt}명</UdongText>
                    <UdongText style={'GeneralContent'}>{day} {timeToStr(time)}~{timeToStr(time + 1)}</UdongText>
                </HStack>
            ))}
        </VStack>
    )
}

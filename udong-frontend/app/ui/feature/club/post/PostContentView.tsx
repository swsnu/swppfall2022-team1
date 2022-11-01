import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongColors } from '../../../theme/ColorPalette'

export const PostContentView = () => {
    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayDark}
        />
        <h1>이 child부터가 고동현 영역</h1>
        <p>여기서 library 쓰면 됨</p>
        <p>edit에서도 재사용할 예정이니 input하는 거 외에 다른 거 X (raw한 컴포넌트)</p>
    </VStack>
}

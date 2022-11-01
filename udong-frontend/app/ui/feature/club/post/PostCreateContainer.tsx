import { VStack } from '../../../components/Stack'
import { PostContentView } from './PostContentView'

export const PostCreateContainer = () => {
    return <VStack>
        <h1>POsttt Container</h1>
        <p> hello owlrd</p>
        <p>여기는 content 쓰는 외부 library말고 다른 컴포넌트들 (버튼 등등) 다 들어가는 곳!</p>

        <PostContentView/>
    </VStack>
}

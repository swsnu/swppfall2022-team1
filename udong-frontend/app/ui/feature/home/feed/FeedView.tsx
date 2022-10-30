import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'

export const FeedView = () => {
    return <VStack>
        <UdongSearchBar/>
        <Spacer height={8}/>

        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
        <PostItem/>
    </VStack>
}

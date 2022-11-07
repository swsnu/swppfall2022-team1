import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'

export const FeedContainer = () => {
    return <VStack>
        <UdongSearchBar/>
        <Spacer height={8}/>

        <ScrollToTopButton/>

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
        <ScrollToTopButton/>
    </VStack>
}

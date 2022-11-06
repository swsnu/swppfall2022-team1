import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { Header, HEADER_PAGE } from '../header/Header'
import { AddMyScheduleView } from './AddMyScheduleView'
import { MyProfileView } from './MyProfileView'

export const MyPageContainer = () => {
    return <VStack>
        <Header type={HEADER_PAGE.MY_PAGE}/>
        <VStack
            justifyContent={'center'}
            paddingHorizontal={50}
            alignItems={'start'}
        >
            <HStack
                justifyContent={'center'}
                alignItems={'center'}
            >
                <MyProfileView/>
                <Spacer width={50}/>
                <AddMyScheduleView/>
            </HStack>
        </VStack>
    </VStack>
}

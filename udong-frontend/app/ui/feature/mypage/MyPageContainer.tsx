import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { AddMyScheduleView } from './AddMyScheduleView'
import { MyProfileView } from './MyProfileView'

export const MyPageContainer = () => {
    return <VStack justifyContent={'center'}>
        <Spacer height={50}/>

        <HStack
            justifyContent={'center'}
            alignItems={'center'}
        >
            <MyProfileView/>

            <Spacer width={50}/>

            <AddMyScheduleView/>
        </HStack>
    </VStack>
}

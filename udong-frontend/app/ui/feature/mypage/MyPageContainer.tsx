import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { AddMyScheduleView } from './AddMyScheduleView'
import { MyProfileView } from './MyProfileView'

export const MyPageContainer = () => {
    return <HStack
        justifyContent={'center'}
        paddingHorizontal={50}
        alignItems={'start'}
    >
        <HStack
            justifyContent={'center'}
            alignItems={'center'}
        >
            <HStack
                justifyContent={'center'}
                alignItems={'center'}
                width={'100%'}
            >
                <MyProfileView/>
                <Spacer width={50}/>
                <AddMyScheduleView/>
            </HStack>
        </HStack>
    </HStack>
}

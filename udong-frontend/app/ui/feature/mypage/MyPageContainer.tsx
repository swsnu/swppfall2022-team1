import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../domain/store'
import { userSelector } from '../../../domain/store/user/UserSelector'
import { userActions } from '../../../domain/store/user/UserSlice'
import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { AddMyScheduleView } from './AddMyScheduleView'
import { MyProfileView } from './MyProfileView'

export const MyPageContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const me = useSelector(userSelector.userMe)

    useEffect(() => {
        dispatch(userActions.getMyProfile())
    }, [dispatch])

    if (!me) {
        return null
    }

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
                <MyProfileView me={me}/>
                <Spacer width={50}/>
                <AddMyScheduleView me={me}/>
            </HStack>
        </HStack>
    </HStack>
}

import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { UdongSearchBar } from '../../components/UdongSearchBar'
import { UserItem } from './UserItem'

export const SearchMembersView = () => {
    return <VStack>
        <UdongSearchBar/>
        <Spacer height={15}/>

        <VStack
            style={{
                overflow: 'scroll',
                maxHeight: 480,
            }}
        >
            <UserItem
                name={'이유빈'}
                isMe={true}
                isAdmin={true}
            />
            <UserItem
                name={'박지연'}
                isAdmin={true}
            />
            <UserItem
                name={'임유진'}
                isAdmin={true}
            />
            <UserItem
                name={'고동현'}
                isAdmin={true}
            />
            <UserItem name={'이유빈'}/>
            <UserItem name={'이유빈'}/>
            <UserItem name={'고동현'}/>
            <UserItem name={'박지연'}/>
            <UserItem name={'이유빈'}/>
            <UserItem name={'임유진'}/>
            <UserItem name={'고동현'}/>
            <UserItem name={'박지연'}/>
            <UserItem name={'이유빈'}/>
            <UserItem name={'임유진'}/>
            <UserItem name={'임유진'}/>
        </VStack>

    </VStack>
}

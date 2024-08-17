import {Text, View} from 'react-native';
import UserInfo from '../components/user-info';
import {useUserStore} from '../store/user';
import { ScrollView } from 'react-native';

const ProfileScreen = () => {
  const user = useUserStore(store => store.user);
  return (
    <ScrollView>
      <UserInfo />
      <Text>Profile Screen</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>
    </ScrollView>
  );
};

export default ProfileScreen;


import UserInfo from '../components/user-info';
import {ScrollView} from 'react-native';
import {Container} from '../style';

const ProfileScreen = () => {
  return (
    <ScrollView>
      <Container vertical={20} horizontal={20}>
        <UserInfo />
      </Container>
    </ScrollView>
  );
};

export default ProfileScreen;

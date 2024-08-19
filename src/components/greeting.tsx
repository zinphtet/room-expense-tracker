import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {WhiteText} from '../style';
import {useUserStore} from '../store/user';

const Greeting = () => {
  const user = useUserStore(store => store.user);
  return (
    <View>
      <WhiteText variant="titleMedium"> Good Afternoon ,</WhiteText>
      <WhiteText variant="headlineSmall">
        {' '}
        {user?.user.user_metadata?.display_name}
      </WhiteText>
    </View>
  );
};

export default Greeting;

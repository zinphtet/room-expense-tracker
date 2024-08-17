import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {WhiteText} from '../style';

const Greeting = () => {
  return (
    <View>
      <WhiteText variant="titleMedium"> Good Afternoon ,</WhiteText>
      <WhiteText variant="headlineSmall"> Zin Paing Htet</WhiteText>
    </View>
  );
};

export default Greeting;

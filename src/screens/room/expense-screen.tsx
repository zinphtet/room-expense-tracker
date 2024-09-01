import {Text} from 'react-native-paper';
import {Container} from '../../style';
import ExpenseList from '../../components/expense-list';
import {ScrollView} from 'react-native';

const ExpenseScreen: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <Container horizontal={20} vertical={20}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExpenseList navigation={navigation} />
      </ScrollView>
    </Container>
  );
};

export default ExpenseScreen;

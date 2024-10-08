import {Text} from 'react-native-paper';
import {Container} from '../../style';
import ExpenseList from '../../components/expense-list';
import {ScrollView} from 'react-native';
import CategoryExpense from '../../components/category-expense';

const ExpenseScreen: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <Container horizontal={20} vertical={20}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container gap={10}>
          <CategoryExpense />
          <ExpenseList navigation={navigation} />
        </Container>
      </ScrollView>
    </Container>
  );
};

export default ExpenseScreen;

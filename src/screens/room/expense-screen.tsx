import {Text} from 'react-native-paper';
import {Container} from '../../style';
import ExpenseList from '../../components/expense-list';

const ExpenseScreen = () => {
  return (
    <Container horizontal={20} vertical={20}>
      <ExpenseList />
    </Container>
  );
};

export default ExpenseScreen;

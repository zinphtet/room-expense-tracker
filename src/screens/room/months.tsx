import {Text} from 'react-native-paper';
import {Container} from '../../style';
import MonthForm from '../../components/month-form';
import MonthLists from '../../components/month-list';

const MonthsScreen = () => {
  return (
    <Container horizontal={20} vertical={20} gap={20}>
      <MonthForm />
      <Text variant="titleLarge"> Finanical Months</Text>
      <MonthLists />
    </Container>
  );
};

export default MonthsScreen;

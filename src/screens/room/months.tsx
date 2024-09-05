import {Text} from 'react-native-paper';
import {Container} from '../../style';
import MonthForm from '../../components/month-form';
import MonthLists from '../../components/month-list';
import {useMonthStore} from '../../store/month';

const MonthsScreen = () => {
  const month = useMonthStore(store => store.month);
  return (
    <Container horizontal={20} vertical={20} gap={20}>
      <MonthForm />
      <Text variant="titleLarge"> Finanical Months</Text>
      <Text>{month?.name}</Text>
      <MonthLists />
    </Container>
  );
};

export default MonthsScreen;

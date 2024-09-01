import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {Container} from '../style';
import ExpenseItem from './expense-item';
import {useGetAllExpenses} from '../hooks/useQuery';
import {log} from '../lib/helper';

const ExpenseList = () => {
  const {data, isError, isLoading} = useGetAllExpenses();
  log(data, 'expense list');
  return (
    <Container gap={20}>
      <Title>Expense List</Title>
      <Container gap={10}>
        {isLoading && <Text>Loading...</Text>}
        {data?.data?.map((expense: any) => {
          return <ExpenseItem {...expense} />;
        })}
      </Container>
    </Container>
  );
};
export default ExpenseList;

const Title = styled.Text`
  font-size: 18px;
`;

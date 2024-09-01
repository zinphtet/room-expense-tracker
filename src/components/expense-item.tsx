import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {log} from '../lib/helper';

const ExpenseItem: React.FC<any> = data => {
  const {amount, expense_date} = data;
  const date = new Date(expense_date);
  log(data, 'expense item');
  return (
    <ExpenseItemContainer>
      <Text>{amount} MMK</Text>
      <Text>{date.toDateString()}</Text>
    </ExpenseItemContainer>
  );
};
export default ExpenseItem;

const ExpenseItemContainer = styled.View`
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 10px;
`;

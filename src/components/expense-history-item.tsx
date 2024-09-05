import {Text} from 'react-native-paper';
import styled from 'styled-components/native';
import {formatDateOne} from '../lib/helper';
import {FlexCenter, SubTitleText} from '../style';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../constants/theme';
const ExpenseItem: React.FC<Expense> = item => {
  return (
    <ExpenseItemContainer>
      <FlexCenter>
        <SubTitleText
          style={{
            color: theme.colors.primaryDark,
          }}>
          {item?.category?.name || (item.to_room && 'ADDED TO ROOM')}
        </SubTitleText>
        <SubTitleText>{item.amount} MMK</SubTitleText>
      </FlexCenter>
      <FlexCenter>
        <DateContainer>
          <MaterialIcon name="security-update-good" size={25} />
          <Text>{formatDateOne(item.created_at)}</Text>
        </DateContainer>
        <DateContainer>
          <MaterialIcon name="date-range" size={25} />
          <Text>{formatDateOne(item.expense_date)}</Text>
        </DateContainer>
      </FlexCenter>
    </ExpenseItemContainer>
  );
};

export default ExpenseItem;

const ExpenseItemContainer = styled.View`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
`;

const DateContainer = styled.View`
  gap: 5px;
  flex-direction: row;
  align-items: center;
`;

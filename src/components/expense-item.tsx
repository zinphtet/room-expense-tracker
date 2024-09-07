import {Text} from 'react-native';
import styled from 'styled-components/native';
import {formatPrice} from '../lib/helper';
import {FlexCenter, FlexRight, TextBold} from '../style';
import theme from '../constants/theme';

const ExpenseItem: React.FC<any> = data => {
  const {amount, expense_date} = data;
  const date = new Date(expense_date);
  return (
    <ExpenseItemContainer>
      <FlexCenter>
        <TextBold size={16}>{data?.users?.name}</TextBold>
        <MoneyStyle isRed={data.is_room_money}>
          {data?.is_room_money ? 'ROOM' : 'OWN'}
        </MoneyStyle>
        <TextBold size={16}>{formatPrice(amount)}</TextBold>
      </FlexCenter>
      <FlexRight>
        <CateogryText invert={data?.to_room}>
          {!data?.to_room ? data.category?.name : 'ADDED TO ROOM'}
        </CateogryText>
      </FlexRight>
      <FlexCenter>
        <Text>Expense Date</Text>
        <Text>{date.toDateString()}</Text>
      </FlexCenter>
    </ExpenseItemContainer>
  );
};
export default ExpenseItem;

const ExpenseItemContainer = styled.View`
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 10px;
  gap: 10px;
`;

type CategoryTextProps = {
  invert?: boolean;
};
const CateogryText = styled.Text<CategoryTextProps>`
  width: max-content;
  border: 2px solid ${theme.colors.primary};
  background-color: ${props => props.invert && theme.colors.primaryDark};
  color: ${props => props.invert && '#fff'};
  /* background-color: red; */
  padding: 3px 15px 0px;
  border-radius: 10px;
`;

type Props = {
  isRed: true;
};
const MoneyStyle = styled.Text<Props>`
  background-color: ${props => (props.isRed ? theme.colors.primary : 'red')};
  color: #fff;
  padding: 2px 10px 1px;
  border-radius: 5px;
`;

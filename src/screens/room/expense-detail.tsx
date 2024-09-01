import {ScrollView, Text, View} from 'react-native';
import {Container, FlexCenter, FlexRight, TextBold} from '../../style';
import {formatPrice, log} from '../../lib/helper';
import {useGetUserById} from '../../hooks/useQuery';
import styled from 'styled-components/native';
import theme from '../../constants/theme';
import {Button} from 'react-native-paper';

const RoomExpenseDetails: React.FC<{
  route: {params: {expense: ExpenseType}};
}> = ({route}) => {
  const {expense} = route.params;
  log(expense, 'expenseDetails');
  const memberIds = JSON.parse(expense.member_ids);
  const {
    data,
    isError,
    isLoading: isLoadingMembers,
  } = useGetUserById(memberIds);
  log(data?.data, 'Member list');
  const expenseDate = new Date(expense.expense_date);
  const createdDate = new Date(expense.created_at);
  return (
    <ScrollView>
      <Container vertical={20} horizontal={20} gap={40}>
        <FlexCenter>
          <CategoryText>{expense.category?.name}</CategoryText>
          <MoneyStyle isRed={expense.is_room_money}>
            {expense.is_room_money ? 'ROOM' : 'OWN'}
          </MoneyStyle>
        </FlexCenter>
        <Container gap={10}>
          <FlexCenter>
            <Text>Amount </Text>
            <TextBold>{formatPrice(expense?.amount)}</TextBold>
          </FlexCenter>
          <FlexCenter>
            <Text>Member </Text>
            <Text>{expense.users?.name}</Text>
          </FlexCenter>
          <FlexCenter>
            <Text> Expense Date </Text>
            <Text>{expenseDate.toLocaleDateString()}</Text>
          </FlexCenter>
          <FlexCenter>
            <Text> Created Date </Text>
            <Text>{createdDate.toLocaleDateString()}</Text>
          </FlexCenter>
          <FlexCenter>
            <Text>Include Members </Text>
            {isLoadingMembers && <Text>Loading included members ...</Text>}
            {!isLoadingMembers && (
              <View>
                {data?.data?.map((member: Member) => {
                  return <MemberName>{member.name}</MemberName>;
                })}
              </View>
            )}
          </FlexCenter>
          {expense.description && (
            <Container gap={10}>
              <Text>Description</Text>
              <ParaText>
                {'\t'} {'\t'} {'\t'} {'\t'} {'\t'}
                {expense.description}
              </ParaText>
            </Container>
          )}
        </Container>
        <FlexRightCenter>
          <Button mode="contained-tonal">Delete</Button>
          <Button mode="contained">Edit</Button>
        </FlexRightCenter>
      </Container>
    </ScrollView>
  );
};

export default RoomExpenseDetails;

const CategoryText = styled.Text`
  background-color: ${theme.colors.primary};
  padding: 4px 20px;
  color: white;
  border-radius: 10px;
  font-size: 16px;
`;

type Props = {
  isRed?: boolean;
};
const MoneyStyle = styled.Text<Props>`
  background-color: ${props => (props.isRed ? theme.colors.primary : 'red')};
  color: #fff;
  padding: 2px 10px 2px;
  border-radius: 5px;
`;

const MemberName = styled.Text`
  border: 1px solid ${theme.colors.primary};
  margin-bottom: 10px;
  font-size: 12px;
  padding: 2px 20px;
  border-radius: 10px;
`;

const ParaText = styled.Text`
  text-indent: 40px;
`;

const FlexRightCenter = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  flex-direction: row;
`;

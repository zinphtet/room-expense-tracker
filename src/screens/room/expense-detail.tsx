import {ScrollView, Text, View} from 'react-native';
import {Container, FlexCenter, FlexRight, TextBold} from '../../style';
import {formatPrice, log} from '../../lib/helper';
import {useDeleteExpense, useGetUserById} from '../../hooks/useQuery';
import styled from 'styled-components/native';
import theme from '../../constants/theme';
import {Button} from 'react-native-paper';
import {useUserStore} from '../../store/user';
import {useToast} from 'react-native-toast-notifications';
import {useState} from 'react';
import ConfirmDialog from '../../components/confirm-modal';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../constants';
const RoomExpenseDetails: React.FC<{
  route: {params: {expense: ExpenseType}};
  navigation: any;
}> = ({route}) => {
  const {expense} = route.params;
  log(expense, 'expenseDetails');
  const memberIds = JSON.parse(expense.member_ids);
  const {
    data,
    isError,
    isLoading: isLoadingMembers,
  } = useGetUserById(memberIds);
  const {mutate: deleteExepenseById, isPending: isDeletingExpense} =
    useDeleteExpense();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const expenseDate = new Date(expense.expense_date);
  const createdDate = new Date(expense.created_at);
  const user = useUserStore(store => store.user);

  const hasPermission = user?.user.id === expense.created_user_id;

  const editHandler = () => {
    // @ts-ignore
    navigation.push(screenNames.room_expense_form, {expense: expense});
  };
  const onDeleteHandler = () => {
    deleteExepenseById(expense.id, {
      onSuccess: () => {
        toast.show('Successfully deleted', {
          type: 'success',
        });
        setShowModal(false);
        queryClient.invalidateQueries();
        navigation.goBack();
      },
      onError: () => {
        toast.show('Error deleting expense', {
          type: 'danger',
        });
      },
    });
  };
  return (
    <ScrollView>
      <Container vertical={20} horizontal={20} gap={40}>
        <ConfirmDialog
          asyncFn={onDeleteHandler}
          closeFn={() => setShowModal(false)}
          isLoading={isDeletingExpense}
          show={showModal}
          key={expense.id}
        />
        <FlexCenter>
          <CategoryText>
            {!expense.to_room ? expense.category?.name : 'ADDED TO ROOM'}
          </CategoryText>
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
        {hasPermission && (
          <FlexRightCenter>
            <Button mode="contained-tonal" onPress={() => setShowModal(true)}>
              Delete
            </Button>
            <Button mode="contained" onPress={editHandler}>
              Edit
            </Button>
          </FlexRightCenter>
        )}
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

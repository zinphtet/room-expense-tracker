import {Text} from 'react-native';
import styled from 'styled-components/native';
import {
  CenterContainer,
  Container,
  FlexCenter,
  FlexRight,
  TextBold,
} from '../style';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {useRoomStore} from '../store/room';
import {useGetAllExpenses, useRemoveUserFromRoom} from '../hooks/useQuery';
import {useUserStore} from '../store/user';
import {useToast} from 'react-native-toast-notifications';
import {useQueryClient} from '@tanstack/react-query';
import {useMonthStore} from '../store/month';
import theme from '../constants/theme';
import {formatPrice, log} from '../lib/helper';

const MemberCard: React.FC<Member> = ({name, email, id, room_id}) => {
  const user = useUserStore(state => state.user);
  const {isError, isPending, mutate: removeUser} = useRemoveUserFromRoom();
  const {
    data,
    isError: isExpenesError,
    isLoading: isExpensesLoading,
  } = useGetAllExpenses();
  const room = useRoomStore(state => state.room);
  const toast = useToast();
  const isAdmin = id === room?.room.created_user_id;
  const showRemove = user?.user.id === room?.room.created_user_id && !isAdmin;
  const queryClient = useQueryClient();
  const removeUserHandler = () => {
    // const id = null;
    // @ts-ignore
    removeUser(id, {
      onSuccess: () => {
        toast.show('Removed member successfully', {
          type: 'success',
        });
        queryClient.invalidateQueries();
      },
      onError: () => {
        toast.show('Error removing member', {
          type: 'error',
        });
      },
    });
  };

  // log(data, 'all expenses');
  // extracting values
  const collectedMoney = data?.data
    ?.filter(exp => exp.created_user_id === id && exp.to_room === true)
    .reduce((accum, val) => accum + parseInt(val.amount), 0);

  const ownMoney = data?.data
    ?.filter(
      exp =>
        exp.created_user_id === id &&
        exp.to_room === false &&
        exp.is_room_money === false,
    )
    .reduce((accum, val) => accum + parseInt(val.amount), 0);

  const filterRoomExpenses = data?.data?.filter(exp => exp.to_room === false);
  const memberExpenses = {} as Record<string, number>;
  filterRoomExpenses?.forEach(exp => {
    const memberIds = JSON.parse(exp.member_ids) as string[];
    const eachExpense = parseInt(exp.amount) / memberIds.length;
    memberIds.forEach(id => {
      if (!memberExpenses[id]) {
        memberExpenses[id] = eachExpense;
        return;
      }
      memberExpenses[id] += eachExpense;
    });
  });

  const memberRoomExpense = ownMoney! + collectedMoney!;
  return (
    <CardWrapper>
      <FlexCenter>
        <View>
          <TextBold>{name}</TextBold>
          <Text> {email}</Text>
        </View>
        <FlexCenter>
          {isAdmin && <Button mode="contained">Admin</Button>}
          {showRemove && (
            <Button
              onPress={removeUserHandler}
              disabled={isPending}
              mode="outlined">
              Remove
            </Button>
          )}
        </FlexCenter>
      </FlexCenter>
      <Container style={{marginTop: 0}}></Container>
      <Container vertical={10}>
        <GreenBar>Room Expenses</GreenBar>
        <FlexCenter style={{marginTop: 5}}>
          <Text>Collected Money</Text>
          <TextBold size={16}>{formatPrice(collectedMoney!)}</TextBold>
        </FlexCenter>
        <FlexCenter style={{marginTop: 5}}>
          <Text>Own Money</Text>
          <TextBold size={16}>{formatPrice(ownMoney!)}</TextBold>
        </FlexCenter>
        <Underline></Underline>
        <FlexRight>
          <TextBold size={16}>{formatPrice(memberRoomExpense)}</TextBold>
        </FlexRight>
        <FlexCenter style={{marginTop: 20}}>
          <Text>Your Expense for this Month</Text>
          <TextBold size={16} style={{color: 'red'}}>
            {formatPrice(memberExpenses[id] || 0)}
          </TextBold>
        </FlexCenter>
        <FlexCenter style={{marginTop: 10}}>
          <Text>Differences </Text>
          <TextBold size={16} style={{color: 'red'}}>
            {formatPrice(memberRoomExpense - memberExpenses[id] || 0)}
          </TextBold>
        </FlexCenter>
      </Container>
    </CardWrapper>
  );
};

export default MemberCard;

const CardWrapper = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const GreenBar = styled.Text`
  background-color: ${theme.colors.primaryDark};
  color: #fff;
  padding: 5px 20px;
  border-radius: 5px;
`;

const Underline = styled.View`
  width: 100%;
  height: 2px;
  background-color: gray;
  margin-top: 5px;
`;

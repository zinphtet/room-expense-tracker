import {Text} from 'react-native';
import styled from 'styled-components/native';
import {CenterContainer, FlexCenter, TextBold} from '../style';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {useRoomStore} from '../store/room';
import {useRemoveUserFromRoom} from '../hooks/useQuery';
import {useUserStore} from '../store/user';
import {useToast} from 'react-native-toast-notifications';
import {useQueryClient} from '@tanstack/react-query';

const MemberCard: React.FC<Member> = ({name, email, id, room_id}) => {
  const user = useUserStore(state => state.user);
  const {isError, isPending, mutate: removeUser} = useRemoveUserFromRoom();
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
    </CardWrapper>
  );
};

export default MemberCard;

const CardWrapper = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {ErrorText, FlexCenter, TextBold} from '../style';
import {Button} from 'react-native-paper';
import {useAddMemberToRoom} from '../hooks/useQuery';
import {useRoomStore} from '../store/room';
import {useToast} from 'react-native-toast-notifications';
import {useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

const AddMemberCard: React.FC<Member> = ({email, name, id, room_id}) => {
  const {isError, isPending, mutate: addMember} = useAddMemberToRoom();
  const room = useRoomStore(state => state.room);
  const toast = useToast();
  const queryClient = useQueryClient();
  const [hide, setHide] = useState(false);
  const addMemberHandler = () => {
    addMember(
      {
        user_id: id,
        room_id: room?.room.id!,
      },
      {
        onSuccess: () => {
          toast.show('Successfully added to Room', {
            type: 'success',
          });
          queryClient.invalidateQueries();
          setHide(true);
        },
        onError: () => {
          toast.show('Error while adding member', {
            type: 'error',
          });
        },
      },
    );
  };
  return (
    <CardWrapper>
      <FlexCenter>
        <View>
          <TextBold>{name}</TextBold>
          <Text>{email}</Text>
        </View>
        {!room_id && (
          <Button
            onPress={addMemberHandler}
            icon={'plus'}
            mode="outlined"
            disabled={isPending || hide}>
            Add To Room
          </Button>
        )}
        {isError && <ErrorText>Error while adding member to Room</ErrorText>}
      </FlexCenter>
    </CardWrapper>
  );
};

const CardWrapper = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

export default AddMemberCard;

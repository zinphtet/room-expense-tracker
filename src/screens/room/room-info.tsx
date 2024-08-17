import {Button, Text} from 'react-native-paper';
import {CenterContainer, ErrorText} from '../../style';
import {useUserStore} from '../../store/user';
import styled from 'styled-components/native';
import {screenNames} from '../../constants';
import {useGetRoom} from '../../hooks/useQuery';

const RoomInfoScreen: React.FC<ScreenProps> = ({navigation}) => {
  const {isLoading, isError, data} = useGetRoom();
  const createNewRoomHandler = () => {
    navigation.push(screenNames.create_new_room);
  };
  const room = data?.data![0];
  return (
    <RoomViewContainer>
      {!isLoading && !room && (
        <CenterContainer top={60} bottom={30}>
          {/* <CreateNewRoomModal /> */}
          <Button icon={'plus'} onPress={createNewRoomHandler} mode="contained">
            Create New Room
          </Button>
        </CenterContainer>
      )}
      {room && <Text>{JSON.stringify(room, null, 2)}</Text>}

      {isError && <ErrorText>Error getting your room information</ErrorText>}
    </RoomViewContainer>
  );
};

export default RoomInfoScreen;

const RoomViewContainer = styled.View`
  padding: 10px;
`;

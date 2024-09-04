import {Button, Text} from 'react-native-paper';
import {CenterContainer, Container, ErrorText} from '../../style';
import styled from 'styled-components/native';
import {screenNames} from '../../constants';
import {useGetRoom} from '../../hooks/useQuery';
import RoomCard from '../../components/room-card';
import RoomMenus from '../../components/room-menus';
import {useEffect} from 'react';
import {useRoomStore} from '../../store/room';

const RoomInfoScreen: React.FC<ScreenProps> = ({navigation}) => {
  const {isLoading, isError, data} = useGetRoom();
  const setRoom = useRoomStore(state => state.setRoom);
  const createNewRoomHandler = () => {
    navigation.push(screenNames.create_new_room);
  };
  const routeToAddExpense = () => {
    navigation.push(screenNames.room_expense_form);
  };
  const routeToAddRoom = () => {
    navigation.push(screenNames.add_to_room);
  };
  const room = data?.data![0] as unknown as RoomType;
  useEffect(() => {
    setRoom(room);
  }, [room]);
  return (
    <RoomViewContainer>
      {!isLoading && !room?.room && (
        <CenterContainer top={60} bottom={30}>
          {/* <CreateNewRoomModal /> */}
          <Button icon={'plus'} onPress={createNewRoomHandler} mode="contained">
            Create New Room
          </Button>
        </CenterContainer>
      )}
      {room?.room && (
        <Container vertical={20} horizontal={20} gap={40}>
          {/* <Text>{JSON.stringify(room, null, 2)}</Text> */}
          {/* @ts-ignore */}
          <RoomCard {...room} />
          <RoomMenus navigation={navigation} />
          <ButtonContainer>
            <Button icon={'plus'} mode="contained" onPress={routeToAddRoom}>
              Add to Room
            </Button>
            <Button icon={'plus'} mode="contained" onPress={routeToAddExpense}>
              Add Expense
            </Button>
          </ButtonContainer>
        </Container>
      )}

      {isError && <ErrorText>Error getting your room information</ErrorText>}
    </RoomViewContainer>
  );
};

export default RoomInfoScreen;

const RoomViewContainer = styled.View`
  padding: 10px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
`;

import {Button, Text} from 'react-native-paper';
import {CenterContainer, Container} from '../../style';
import RoomMembers from '../../components/room-members';
import {screenNames} from '../../constants';

const Members: React.FC<ScreenProps> = ({navigation}) => {
  const addNewHandler = () => {
    navigation.push(screenNames.add_new_member);
  };
  return (
    <Container horizontal={20} vertical={20}>
      <CenterContainer>
        <Button onPress={addNewHandler} icon={'plus'} mode="contained">
          AddMember
        </Button>
      </CenterContainer>
      <RoomMembers />
    </Container>
  );
};

export default Members;

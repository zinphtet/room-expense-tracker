import {Button, Text} from 'react-native-paper';
import {CenterContainer, Container} from '../../style';
import RoomMembers from '../../components/room-members';
import {screenNames} from '../../constants';
import {ScrollView} from 'react-native';

const Members: React.FC<ScreenProps> = ({navigation}) => {
  const addNewHandler = () => {
    navigation.push(screenNames.add_new_member);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container horizontal={20} vertical={20}>
        <CenterContainer>
          <Button onPress={addNewHandler} icon={'plus'} mode="contained">
            AddMember
          </Button>
        </CenterContainer>
        <RoomMembers />
      </Container>
    </ScrollView>
  );
};

export default Members;

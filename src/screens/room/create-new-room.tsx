import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {Container} from '../../style';
import CreateRoomForm from '../../components/create-room-form';

const CreateNewRoomScreen = () => {
  return (
    <Container vertical={20} horizontal={20}>
      <CreateRoomForm />
    </Container>
  );
};

export default CreateNewRoomScreen;

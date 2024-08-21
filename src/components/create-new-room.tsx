import * as React from 'react';
import {Dimensions} from 'react-native';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';

const CreateNewRoomModal = () => {
  const [visible, setVisible] = React.useState(false);
  const {width, height} = Dimensions.get('screen');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    top: 0,
    height: 400,
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button icon={'plus'} onPress={showModal} mode="contained">
        Create New Room
      </Button>
    </>
  );
};

export default CreateNewRoomModal;

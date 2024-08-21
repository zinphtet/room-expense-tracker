import {View} from 'react-native';
import Modal from 'react-native-modal';
import {Button, Text} from 'react-native-paper';

type ConfirmDialogProps = {
  show: boolean;
  asyncFn: () => Promise<void>;
  isLoading: boolean;
  closeFn: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  show,
  asyncFn,
  isLoading,
  closeFn,
}) => {
  return (
    <Modal
      isVisible={show}
      onBackButtonPress={closeFn}
      onBackdropPress={closeFn}>
      <View
        style={{
          backgroundColor: '#fff',
          height: 'auto',
          borderRadius: 20,
          padding: 20,
          paddingTop: 20,
          paddingBottom: 40,
          alignContent: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Text variant="labelLarge">Hello WOrld</Text>
        <Text>Are you sure you want to delete this item</Text>
        <Button onPress={closeFn} mode="outlined" disabled={isLoading}>
          No
        </Button>
        <Button onPress={asyncFn} mode="contained" disabled={isLoading}>
          Yes
        </Button>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;

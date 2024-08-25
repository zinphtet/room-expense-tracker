import {View} from 'react-native';
import Modal from 'react-native-modal';
import {Button, Text} from 'react-native-paper';
import {FlexCenter} from '../style';
import styled from 'styled-components/native';

type ConfirmDialogProps = {
  show: boolean;
  asyncFn: () => void;
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
          paddingBottom: 20,
          alignContent: 'center',
          justifyContent: 'center',
          position: 'relative',
          gap: 20,
        }}>
        <TextCenter> Delete ?</TextCenter>
        <TextCenter>Are you sure you want to delete this item</TextCenter>
        <CetnerItem>
          <Button onPress={closeFn} mode="outlined" disabled={isLoading}>
            No
          </Button>
          <Button onPress={asyncFn} mode="contained" disabled={isLoading}>
            Yes
          </Button>
        </CetnerItem>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;

export const CetnerItem = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 30px;
`;

type Props = {
  size?: number;
};
export const TextCenter = styled.Text<Props>`
  text-align: center;
  /* font-size: ${props => props.size}px; */
`;

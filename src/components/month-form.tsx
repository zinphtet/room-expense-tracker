import {Alert, Pressable, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button, TextInput} from 'react-native-paper';
import {ButtonContainer, CenterContainer, Container} from '../style';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants/theme';
import styled from 'styled-components/native';
import {useRoomStore} from '../store/room';
import {useCreateMonth, useUpdateMonth} from '../hooks/useQuery';
import {useToast} from 'react-native-toast-notifications';
import {useQueryClient} from '@tanstack/react-query';

type FormProps = {
  isUpdate?: boolean;
  updateObject?: UpdateMonthType;
};
const MonthForm: React.FC<FormProps> = ({isUpdate, updateObject}) => {
  const [showModal, setShowModal] = useState(false);
  const room = useRoomStore(state => state.room);
  const {isPending, isError, mutate: createMonth} = useCreateMonth();
  const {isPending: isUpdating, mutate: updateMonth} = useUpdateMonth();
  const toast = useToast();
  const queryClinet = useQueryClient();
  console.log('udpateOBje', JSON.stringify(updateObject, null, 2));
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: {errors},
  } = useForm<{
    name: string;
  }>();
  const showModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };
  const submitHandler = (data: {name: string}) => {
    console.log('month data', JSON.stringify(data, null, 2));
    if (isUpdate) {
      updateMonth(
        {
          id: updateObject?.id!,
          data: {
            name: data.name,
          },
        },
        {
          onSuccess: () => {
            setValue('name', '');
            closeModalHandler();
            toast.show('Updated successfully', {
              type: 'success',
              placement: 'top',
            });
            queryClinet.invalidateQueries();
          },
          onError: () => {
            toast.show('Error updating !', {
              type: 'warning',
            });
          },
        },
      );
      return;
    }
    createMonth(
      {
        room_id: room?.room.id,
        name: data.name,
      },
      {
        onSuccess: () => {
          setValue('name', '');
          closeModalHandler();
          toast.show('Create successfully', {
            type: 'success',
            placement: 'top',
          });
          queryClinet.invalidateQueries();
        },
        onError: () => {
          toast.show('Error !', {
            type: 'warning',
          });
        },
      },
    );
  };
  return (
    <View>
      <CenterContainer>
        {isUpdate && (
          <Pressable onPress={showModalHandler}>
            <Material
              name="square-edit-outline"
              size={25}
              color={theme.colors.primary}
            />
          </Pressable>
        )}
        {!isUpdate && (
          <Button mode="contained" icon={'plus'} onPress={showModalHandler}>
            Create Month
          </Button>
        )}
      </CenterContainer>
      <Modal
        isVisible={showModal}
        onBackButtonPress={closeModalHandler}
        onBackdropPress={closeModalHandler}>
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
          <Container gap={20}>
            <ButtonContainer>
              <ClosePressable onPress={closeModalHandler}>
                <Material
                  name="close"
                  size={15}
                  color={theme.colors.destructive}
                />
              </ClosePressable>
            </ButtonContainer>
            <Controller
              name="name"
              control={control}
              defaultValue={updateObject?.data.name}
              rules={{
                required: 'Month name is required',
                minLength: {
                  value: 3,
                  message: 'Month  name must be at least 3 characters',
                },
              }}
              render={({field}) => (
                <>
                  <TextInput
                    label="Your month name"
                    value={field.value}
                    onChangeText={field.onChange}
                    mode="outlined"
                  />
                </>
              )}
            />
            {errors.name && (
              <Text style={{color: theme.colors.destructive}}>
                {errors.name.message}
              </Text>
            )}
            <ButtonContainer>
              <Button
                disabled={isPending || isUpdating}
                onPress={handleSubmit(submitHandler)}
                mode="contained">
                {isPending || isUpdating ? 'Saving ...' : 'Save'}
              </Button>
            </ButtonContainer>
          </Container>
        </View>
      </Modal>
    </View>
  );
};
export default MonthForm;

const ClosePressable = styled.Pressable`
  padding: 5px;
  border-radius: 30px;
  border: 1px solid ${theme.colors.primary};
`;

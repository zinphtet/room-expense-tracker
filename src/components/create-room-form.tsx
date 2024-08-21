import {Controller} from 'react-hook-form';
import {Alert, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import styled from 'styled-components/native';
import {ButtonContainer, ErrorText, FormContainer} from '../style';
import {
  useAddMemberToRoom,
  useCreateForm,
  useUpdateUserInfo,
} from '../hooks/useQuery';
import {useToast} from 'react-native-toast-notifications';
import {log} from '../lib/helper';
import {useUserStore} from '../store/user';
import {useQueryClient} from '@tanstack/react-query';
const CreateRoomForm = () => {
  const queryClient = useQueryClient();
  const {isError, isPending, mutate: createRoom} = useCreateForm();
  const {
    data,
    isPending: isAddingUser,
    mutate: addMember,
  } = useAddMemberToRoom();
  const {control, handleSubmit, watch, reset, setValue} = useForm();
  const user = useUserStore(store => store.user);
  const toast = useToast();
  //   @ts-ignore
  const submitHandler = data => {
    createRoom(data, {
      onSuccess: data => {
        log(data, 'success created data');
        addMember(
          {
            user_id: user?.user.id!,
            //   @ts-ignore
            room_id: data?.data[0].id,
          },
          {
            onSuccess: () => {
              setValue('name', '');
              toast.show('Created Successful', {
                type: 'success',
              });
              queryClient.invalidateQueries();
            },
          },
        );
      },
    });
  };
  const isValidName = watch('name')?.length >= 3;
  return (
    <FormContainer>
      <Controller
        name="name"
        control={control}
        render={({field}) => (
          <>
            <TextInput
              label="Room Name"
              value={field.value}
              onChangeText={field.onChange}
              mode="outlined"
            />
          </>
        )}
      />
      <ButtonContainer>
        <Button
          mode="contained"
          onPress={handleSubmit(submitHandler)}
          disabled={!isValidName || isPending || isAddingUser}>
          {isPending || isAddingUser ? 'Saving ...' : 'Save'}
        </Button>
      </ButtonContainer>
      {isError && <ErrorText>Error creating new room</ErrorText>}
    </FormContainer>
  );
};
export default CreateRoomForm;

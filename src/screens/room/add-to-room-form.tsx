import {Text, View} from 'react-native';
import {ButtonContainer, Container} from '../../style';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Button, TextInput} from 'react-native-paper';
import {useRoomStore} from '../../store/room';
import {useMonthStore} from '../../store/month';
import {useCreateAddToRoom, useUpdateRoomExpense} from '../../hooks/useQuery';
import {useToast} from 'react-native-toast-notifications';
import {useQueryClient} from '@tanstack/react-query';
import {log} from '../../lib/helper';
import {screenNames} from '../../constants';

type FormState = {
  amount: string;
  description?: string;
};

// @ts-ignore
const AddToRoomForm = ({route, navigation}) => {
  const expense = route?.params?.expense as ExpenseType;
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm<FormState>({
    defaultValues: {
      amount: expense ? expense.amount.toString() : '',
      description: expense ? expense.description : '',
    },
  });
  //   data from state
  const toast = useToast();
  const queryClient = useQueryClient();

  const {isPending, mutate: createAddToRoom} = useCreateAddToRoom();
  const {isPending: isUpdating, mutate: updateExpense} = useUpdateRoomExpense();
  const room = useRoomStore(store => store.room);
  const month = useMonthStore(store => store.month);
  //
  const submitHandler: SubmitHandler<FormState> = data => {
    log(data, 'adding to room money');
    if (expense) {
      updateExpense(
        {
          amount: parseInt(data.amount),
          description: data.description,
          id: expense.id,
        },
        {
          onSuccess: () => {
            toast.show('Updated successfully', {
              type: 'success',
            });
            queryClient.invalidateQueries();
            navigation.push(screenNames.expense_list);
          },
          onError: () => {
            toast.show('Error updating ', {
              type: 'danger',
            });
          },
        },
      );
      return;
    }
    // return;
    createAddToRoom(
      {
        amount: parseInt(data.amount),
        description: data.description,
        room_id: room?.room.id!,
        month_id: month?.id!,
      },
      {
        onSuccess: () => {
          toast.show('Add money to room successfully', {
            type: 'success',
          });
          setValue('amount', '');
          setValue('description', '');
          queryClient.invalidateQueries();
        },
        onError: () => {
          toast.show('Error adding money to room', {
            type: 'danger',
          });
        },
      },
    );
  };
  return (
    <Container vertical={20} horizontal={20}>
      <Controller
        name="amount"
        control={control}
        rules={{
          min: 3,
          required: true,
        }}
        render={({field}) => {
          return (
            <>
              <TextInput
                label={'Amonut'}
                keyboardType="numeric"
                value={field.value}
                // {...register('amount')}
                style={{marginBottom: 10}}
                onChangeText={field.onChange}
                // {...field}
              />
            </>
          );
        }}
      />
      <Controller
        name="description"
        control={control}
        render={({field}) => {
          return (
            <>
              <TextInput
                label={'Description'}
                multiline={true}
                numberOfLines={3}
                value={field.value}
                onChangeText={field.onChange}
              />
            </>
          );
        }}
      />
      <Container vertical={40}>
        <ButtonContainer>
          <Button
            mode="contained"
            disabled={isPending || isUpdating}
            onPress={handleSubmit(submitHandler)}>
            {expense ? 'Update to Room' : 'Add to Room'}
          </Button>
        </ButtonContainer>
      </Container>
    </Container>
  );
};

export default AddToRoomForm;

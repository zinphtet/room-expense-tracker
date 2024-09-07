import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Container, ErrorText, FormContainer} from '../../style';
import {Button, TextInput} from 'react-native-paper';
import {PaperSelect} from 'react-native-paper-select';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {DatePickerInput} from 'react-native-paper-dates';
import {ScrollView, View} from 'react-native';
import styled from 'styled-components/native';
import {
  useCreateRoomExpense,
  useGetCategoriesByRoom,
  useGetMembersByRoom,
} from '../../hooks/useQuery';
import {log} from '../../lib/helper';
import {useQueryClient} from '@tanstack/react-query';
import {useRoomStore} from '../../store/room';
import {useMonthStore} from '../../store/month';
import {useToast} from 'react-native-toast-notifications';
import {enGB, registerTranslation} from 'react-native-paper-dates';
registerTranslation('en-GB', enGB);
type FormData = {
  categoryId: string;
  memberIds: string;
  amount: string;
  description: string;
  room_money: string;
  date: Date | undefined;
};

const ExpenseForm = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm<FormData>();

  const {
    isError: isErrorCreatingExpense,
    isPending: isCreatingExpense,
    mutate: createRoomExpense,
  } = useCreateRoomExpense();
  const toast = useToast();
  // GET local data
  const room = useRoomStore(state => state.room?.room);
  const month = useMonthStore(state => state.month);
  const queryClient = useQueryClient();
  // fetch remote data
  const {data: categories, isLoading: categoryLoading} =
    useGetCategoriesByRoom();
  const listCategory = useMemo(() => {
    return categories?.data?.map(cat => {
      return {_id: cat.id as string, value: cat.name as string};
    });
  }, [categories?.data]);
  const [categoriesList, setCategoriesList] = useState({
    value: '',
    list: categories?.data?.map(cat => {
      return {_id: cat.id as string, value: cat.name as string};
    }),
    selectedList: [],
    error: '',
  });

  const [roomMoney, setRoomMoney] = useState({
    value: '',
    list: [
      {
        _id: '1',
        value: 'Room Money',
      },
      {
        _id: '2',
        value: 'Own Money',
      },
    ],
    selectedList: [],
    error: '',
  });

  const {data: members, isLoading: isMemberLoading} = useGetMembersByRoom();
  const memberList = useMemo(() => {
    return (
      members?.data?.map(mem => ({
        _id: mem.id as string,
        value: mem.name as string,
      })) || []
    );
  }, [members?.data]);
  const memberSelectObject = {
    value: '',
    list: memberList || [],
    selectedList: [],
    error: '',
  };
  const [memberIds, setMemberIds] = useState(memberSelectObject);

  const submitHandler: SubmitHandler<FormData> = data => {
    // console.log('Submitted data', JSON.stringify(data, null, 2));

    // log(categoriesList, 'selected categroies');

    // log(memberIds), 'selected members';
    // @ts-ignore
    const categoryId = categoriesList.selectedList[0]._id;
    const membersIdArr = memberIds.selectedList.map(member => {
      // @ts-ignore
      return member._id;
    });

    const createObj: CreateRoomExpenseType = {
      amount: parseInt(data.amount),
      description: data.description,
      category_id: categoryId,
      room_id: room?.id!,
      expense_date: data.date ? new Date(data.date).toISOString() : '',
      is_room_money: data.room_money === 'Own Money' ? false : true,
      month_id: month?.id!,
      member_ids: JSON.stringify(membersIdArr),
    };
    log(createObj, 'created Object');
    createRoomExpense(createObj, {
      onSuccess: () => {
        toast.show('Successfully created', {
          type: 'success',
        });
        reset();
        setValue('amount', '');
        setValue('description', '');
        // Invalidate all quantities
        queryClient.invalidateQueries();
      },
      onError: err => {
        toast.show('Error creating  expense', {
          type: 'danger',
        });
        log(err, 'error creating expense');
      },
    });
  };

  useEffect(() => {
    if (memberList) {
      setMemberIds(prevState => ({
        ...prevState,
        list: memberList,
      }));
    }
  }, [memberList]);

  useEffect(() => {
    if (listCategory) {
      setCategoriesList(prevState => ({
        ...prevState,
        list: listCategory,
      }));
    }
  }, [listCategory]);

  return (
    <ScrollView>
      <Container horizontal={20} vertical={20}>
        {!categoryLoading && (
          <Controller
            name="categoryId"
            control={control}
            rules={{
              required: true,
            }}
            render={({field}) => {
              return (
                <PaperSelect
                  label="Select Category"
                  // value={categoriesList.value}
                  value={field.value}
                  errorStyle={{
                    backgroundColor: errors.categoryId && '#cf7070',
                  }}
                  onSelection={(value: any) => {
                    log(value, 'cateogry value');
                    field.onChange(value.text);
                    setCategoriesList({
                      ...categoriesList,
                      value: value.text,
                      selectedList: value.selectedList,
                      error: '',
                    });
                  }}
                  arrayList={[
                    ...(categoriesList?.list || [
                      {_id: 'loading', value: 'loading ...'},
                    ]),
                  ]}
                  selectedArrayList={categoriesList.selectedList}
                  errorText={categoriesList.error}
                  multiEnable={false}
                  textInputMode="flat"
                  // searchStyle={{iconColor: 'red'}}
                  // searchPlaceholder="Procurar"
                  // limitError='hrllo'
                  dialogCloseButtonText="Close"
                  dialogDoneButtonText="Add"
                />
              );
            }}
          />
        )}
        {errors.categoryId && (
          <ErrorText style={{marginTop: -10, paddingBottom: 10}}>
            Please select category
          </ErrorText>
        )}

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
        {errors.amount && (
          <ErrorText style={{marginTop: -10, paddingBottom: 10}}>
            Please enter amount
          </ErrorText>
        )}
        <Controller
          name="room_money"
          control={control}
          rules={{
            required: true,
          }}
          render={({field}) => {
            return (
              <PaperSelect
                label="Billing From"
                value={field.value}
                onSelection={(value: any) => {
                  field.onChange(value.text);
                  setRoomMoney({
                    ...roomMoney,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: '',
                  });
                }}
                arrayList={[...roomMoney.list]}
                selectedArrayList={roomMoney.selectedList}
                errorText={roomMoney.error}
                multiEnable={false}
                textInputMode="flat"
                // searchStyle={{iconColor: 'red'}}
                // searchPlaceholder="Procurar"
                // limitError='hrllo'
                dialogCloseButtonText="Close"
                dialogDoneButtonText="Add"
              />
            );
          }}
        />
        {errors.room_money && (
          <ErrorText style={{marginTop: -10, paddingBottom: 10}}>
            Please select Billing From
          </ErrorText>
        )}
        {!isMemberLoading && (
          <Controller
            name="memberIds"
            control={control}
            rules={{
              required: true,
            }}
            render={({field}) => {
              return (
                <PaperSelect
                  label="Select Members"
                  value={field.value}
                  onSelection={(value: any) => {
                    field.onChange(value.text);
                    setMemberIds({
                      ...memberIds,
                      value: value.text,
                      selectedList: value.selectedList,
                      error: '',
                    });
                  }}
                  arrayList={[
                    ...(memberIds?.list || [
                      {_id: 'loading', value: 'loading ...'},
                    ]),
                  ]}
                  selectedArrayList={memberIds.selectedList}
                  errorText={memberIds.error}
                  multiEnable={true}
                  textInputMode="flat"
                  // searchStyle={{iconColor: 'red'}}
                  // searchPlaceholder="Procurar"
                  // limitError='hrllo'
                  dialogCloseButtonText="Close"
                  dialogDoneButtonText="Add"
                />
              );
            }}
          />
        )}
        {errors.memberIds && (
          <ErrorText style={{marginTop: -10, paddingBottom: 10}}>
            Please select members{' '}
          </ErrorText>
        )}

        <Controller
          control={control}
          name="date"
          rules={{
            required: true,
          }}
          render={({field}) => {
            return (
              <DatePickerInput
                locale="en"
                style={{marginTop: 0}}
                label="Expense date"
                value={field.value}
                onChange={field.onChange}
                inputMode="start"
              />
            );
          }}
        />
        {errors.date && (
          <ErrorText style={{marginTop: 0, paddingBottom: 10}}>
            Please select date
          </ErrorText>
        )}
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
                  style={{marginTop: errors.date ? 0 : 10}}
                  value={field.value}
                  onChangeText={field.onChange}
                />
              </>
            );
          }}
        />
        <ButtonContainer>
          <Button
            mode="contained"
            disabled={isCreatingExpense}
            onPress={handleSubmit(submitHandler)}>
            Add Expense
          </Button>
        </ButtonContainer>
      </Container>
    </ScrollView>
  );
};

export default ExpenseForm;

const ButtonContainer = styled.View`
  margin-top: 40px;
  align-items: center;
  justify-content: center;
`;

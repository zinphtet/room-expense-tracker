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
  useUpdateRoomExpense,
} from '../../hooks/useQuery';
import {log} from '../../lib/helper';
import {useQueryClient} from '@tanstack/react-query';
import {useRoomStore} from '../../store/room';
import {useMonthStore} from '../../store/month';
import {useToast} from 'react-native-toast-notifications';
import {enGB, registerTranslation} from 'react-native-paper-dates';
import {screenNames} from '../../constants';

registerTranslation('en-GB', enGB);
type FormData = {
  categoryId: string;
  memberIds: string;
  amount: string;
  description: string;
  room_money: string;
  date: Date | undefined;
};

// @ts-ignore
const ExpenseForm = ({route, navigation}) => {
  const expense = route?.params?.expense as ExpenseType;
  log(expense, 'Edit Expense');

  const isEdit = expense ? true : false;
  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      amount: isEdit ? expense.amount.toString() : '0',
      description: isEdit ? expense.description : '',
      date: isEdit ? new Date(expense.expense_date) : new Date(),
      categoryId: isEdit ? expense.category?.name : '',
      room_money: isEdit
        ? expense.is_room_money
          ? 'Room Money'
          : 'Own Money'
        : '',
    },
  });

  const {
    isError: isErrorCreatingExpense,
    isPending: isCreatingExpense,
    mutate: createRoomExpense,
  } = useCreateRoomExpense();

  const {isPending: isUpdatingExpense, mutate: updateExpense} =
    useUpdateRoomExpense();
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
    selectedList: isEdit
      ? [
          {
            _id: expense.is_room_money ? '1' : '2',
            value: expense.is_room_money ? 'Room Money' : 'Own Money',
          },
        ]
      : [],
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
    if (isEdit) {
      log(createObj, 'Update Objeect');
      const updateObj = {
        ...createObj,
        id: expense.id,
      };
      updateExpense(updateObj, {
        onSuccess: () => {
          toast.show('Update Success', {
            type: 'success',
          });
          queryClient.invalidateQueries();
          navigation.push(screenNames.expense_list);
        },
        onError: () => {
          toast.show('Update Expense Error', {
            type: 'danger',
          });
        },
      });
      return;
    }
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
    if (isEdit) {
      const selectedList = [] as never[];
      const incomingArr = JSON.parse(expense.member_ids) as string[];
      incomingArr.forEach(id => {
        const member = memberList.find(mem => mem._id === id);
        if (member) {
          // @ts-ignore
          selectedList.push(member);
        }
      });
      // @ts-ignore
      const selectedNames = selectedList.map(mem => mem?.value);
      log(selectedNames, 'my selected List');
      setMemberIds(prev => {
        return {
          ...prev,
          selectedList: selectedList as unknown as never[],
        };
      });
      console.log('SET MEMBERS IDS');
    }
  }, [memberList, isEdit]);

  useEffect(() => {
    if (isEdit) {
      setCategoriesList(prev => ({
        ...prev,
        value: expense.category?.name || '',
        selectedList: [
          {
            _id: expense.category_id,
            value: expense.category?.name,
          },
        ] as never[],
      }));
    }
    if (listCategory) {
      setCategoriesList(prevState => ({
        ...prevState,
        list: listCategory,
      }));
    }
  }, [listCategory, isEdit]);
  log(memberIds, 'MembersIds  .....');
  // @ts-ignore
  const selectedNames = memberIds.selectedList.map(mem => mem.value).join(',');
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
                  value={field.value || selectedNames}
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
            disabled={isCreatingExpense || isUpdatingExpense}
            onPress={handleSubmit(submitHandler)}>
            {isEdit ? 'Update Expense' : ' Add Expense'}
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

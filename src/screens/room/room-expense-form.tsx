import {Controller, useForm} from 'react-hook-form';
import {Container, FormContainer} from '../../style';
import {TextInput} from 'react-native-paper';
import {PaperSelect} from 'react-native-paper-select';
import {useCallback, useState} from 'react';
import {DatePickerInput} from 'react-native-paper-dates';
type FormData = {
  categoryId: string;
  memberIds: string;
  amount: number;
  description: string;
  room_money: boolean;
  date: Date | undefined;
};

const ExpenseForm = () => {
  const {control, watch} = useForm<FormData>({
    defaultValues: {
      date: undefined,
    },
  });
  const [colors, setColors] = useState({
    value: '',
    list: [
      {_id: '1', value: 'BLUE'},
      {_id: '2', value: 'RED'},
      {_id: '3', value: 'GREEN'},
      {_id: '4', value: 'YELLOW'},
      {_id: '5', value: 'BROWN'},
      {_id: '6', value: 'BLACK'},
      {_id: '7', value: 'WHITE'},
      {_id: '8', value: 'CYAN'},
    ],
    selectedList: [],
    error: '',
  });
  const [inputDate, setInputDate] = useState(undefined);

  const mydate = watch('date');
  console.log('mydate', mydate);

  return (
    <Container horizontal={20} vertical={20} gap={10}>
      <Controller
        name="amount"
        control={control}
        render={({field}) => {
          return (
            <>
              <TextInput
                label={'Amonut'}
                keyboardType="numeric"
                value={field.value}
                onChange={field.onChange}
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
                onChange={field.onChange}
              />
            </>
          );
        }}
      />

      <Controller
        name="categoryId"
        control={control}
        render={({field}) => {
          return (
            <PaperSelect
              label="Select Colors"
              value={colors.value}
              onSelection={(value: any) => {
                setColors({
                  ...colors,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: '',
                });
              }}
              arrayList={[...colors.list]}
              selectedArrayList={colors.selectedList}
              errorText={colors.error}
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

      <Controller
        control={control}
        name="date"
        render={({field}) => {
          return (
            <DatePickerInput
              locale="en"
              style={{marginTop: 20}}
              label="Expense date"
              value={field.value}
              onChange={field.onChange}
              inputMode="start"
            />
          );
        }}
      />
    </Container>
  );
};

export default ExpenseForm;

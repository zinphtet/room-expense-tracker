import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {Container} from '../style';
import ExpenseItem from './expense-item';
import {useGetAllExpenses} from '../hooks/useQuery';
import {log} from '../lib/helper';
import {screenNames} from '../constants';

const ExpenseList: React.FC<ScreenProps> = ({navigation}) => {
  const {data, isError, isLoading} = useGetAllExpenses();
  //   log(data, 'expense list');
  const detailScreenHandler = (item: any) => {
    navigation.push(screenNames.expense_detail, {expense: item});
  };
  return (
    <Container gap={20}>
      <Title>Expense List</Title>
      <Container gap={10}>
        {isLoading && <Text>Loading...</Text>}
        {/* <ScrollView> */}
        <FlatList
          data={data?.data || []}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Pressable onPress={() => detailScreenHandler(item)}>
                <ExpenseItem {...item} />
              </Pressable>
            );
          }}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
        {/* </ScrollView> */}
      </Container>
    </Container>
  );
};
export default ExpenseList;

const Title = styled.Text`
  font-size: 18px;
`;

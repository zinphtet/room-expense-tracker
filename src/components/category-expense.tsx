import {FlatList, Text} from 'react-native';
import {Container, TextBold, TextCenter} from '../style';
import {useGetExpenseByCategory} from '../hooks/useQuery';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {formatPrice} from '../lib/helper';

const CategoryExpense = () => {
  const {data, isError, isLoading} = useGetExpenseByCategory();

  return (
    <Container vertical={20}>
      {isLoading && (
        <View style={{height: 100}}>
          <Text>Loading ...</Text>
        </View>
      )}
      {!isLoading && (
        <>
          {data?.keys.length === 0 && <Text>No Expenses Found</Text>}
          <FlatList
            data={data?.keys}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
            horizontal={true}
            keyExtractor={item => item}
            renderItem={({index, item}: {index: number; item: string}) => {
              return (
                <CategoryExpenseCard data={data?.expenseByCategoryId[item]} />
              );
            }}
          />
        </>
      )}

      {/* <Text>Hello this is category expense</Text> */}
    </Container>
  );
};
export default CategoryExpense;

const CategoryExpenseCard: React.FC<{data: ExpenseCategory[]}> = ({data}) => {
  const expenses = data;
  const totalAmount = expenses.reduce((accum, value) => {
    return accum + parseInt(value.amount);
  }, 0);
  return (
    <CardContainer>
      <Container gap={10}>
        <TextCenter>{expenses[0]?.category?.name}</TextCenter>
        <TextBold> {formatPrice(totalAmount)}</TextBold>
      </Container>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  padding: 50px 50px;
  background: #fff;
  width: 250px;
  border-radius: 20px;
`;

import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useUserStore} from '../store/user';
import {getRecentExpenes} from '../api';
import {useGetRecentExpenses} from '../hooks/useQuery';
import {FlatList, View} from 'react-native';
import {formatDateOne, log} from '../lib/helper';
import {format} from 'date-fns';
import ExpenseItem from './expense-item';
import {ScrollView} from 'react-native';

const transactions = [
  {
    id: 1,
    title: 'Upwork',
    subtitle: 'Today',
    amount: ' 850.00',
    positive: true,
    // avatar: require('./assets/upwork.png'), // replace with your image path
  },
  {
    id: 2,
    title: 'Transfer',
    subtitle: 'Yesterday',
    amount: ' 85.00',
    positive: false,
    // avatar: require('./assets/avatar.png'), // replace with your image path
  },
  {
    id: 3,
    title: 'Paypal',
    subtitle: 'Jan 30, 2022',
    amount: ' 1,406.00',
    positive: true,
    // avatar: require('./assets/paypal.png'), // replace with your image path
  },
  {
    id: 4,
    title: 'Youtube',
    subtitle: 'Jan 16, 2022',
    amount: ' 11.99 ',
    positive: false,
    // avatar: require('./assets/youtube.png'), // replace with your image path
    actionText: 'Send Again',
  },
  {
    id: 5,
    title: 'Youtube',
    subtitle: 'Jan 16, 2022',
    amount: ' 11.99 ',
    positive: false,
    // avatar: require('./assets/youtube.png'), // replace with your image path
    actionText: 'Send Again',
  },
];

const RecentHistory = () => {
  const {data, isError, isLoading} = useGetRecentExpenses();

  log(data, 'recent history');
  const Expenses = data?.data as unknown as Expense[];
  return (
    <Container>
      <HeaderRow>
        <Text variant="titleLarge">Recent History</Text>
      </HeaderRow>
      {isLoading && (
        <View>
          <ActivityIndicator />
        </View>
      )}

      {isError && (
        <View>
          <Text>Error fetching recent history</Text>
        </View>
      )}
      {Expenses?.length === 0 && <Text>No Recent History</Text>}

      <ScrollView>
        <FlatList
          renderItem={({item}) => <ExpenseItem {...item} />}
          data={Expenses || []}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </Container>
  );
};

export default RecentHistory;

const Container = styled.View`
  padding: 16px;
  margin-top: 10px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

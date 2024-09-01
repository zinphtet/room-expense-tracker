import {useUserStore} from '../store/user';
import styled from 'styled-components/native';
import {CenterContainer} from '../style';
import {Button} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from '../constants';
import CreateNewRoomScreen from './room/create-new-room';
import RoomInfoScreen from './room/room-info';
import RoomExpenseForm from './room/room-expense-form';
import RoomCategories from './room/room-categories';
import Members from './room/members';
import AddNewMemberScreen from './room/add-new-member';
import MonthsScreen from './room/months';
import ExpenseScreen from './room/expense-screen';

const Stack = createNativeStackNavigator();
const RoomScreen = () => {
  return (
    <Stack.Navigator initialRouteName={screenNames.room_info}>
      <Stack.Screen
        name={screenNames.room_info}
        options={{
          headerShown: false,
        }}
        component={RoomInfoScreen}
      />
      <Stack.Screen
        name={screenNames.create_new_room}
        component={CreateNewRoomScreen}
      />
      <Stack.Screen
        name={screenNames.add_new_member}
        component={AddNewMemberScreen}
      />

      <Stack.Screen name={screenNames.month} component={MonthsScreen} />
      <Stack.Screen
        name={screenNames.room_expense_form}
        component={RoomExpenseForm}
      />
      <Stack.Screen name={screenNames.members} component={Members} />
      <Stack.Screen
        name={screenNames.add_room_category}
        component={RoomCategories}
      />
      <Stack.Screen name={screenNames.expense_list} component={ExpenseScreen} />
    </Stack.Navigator>
  );
};

export default RoomScreen;

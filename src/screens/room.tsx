import {useUserStore} from '../store/user';
import styled from 'styled-components/native';
import {CenterContainer} from '../style';
import {Button} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from '../constants';
import CreateNewRoomScreen from './room/create-new-room';
import RoomInfoScreen from './room/room-info';

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
    </Stack.Navigator>
  );
};

export default RoomScreen;

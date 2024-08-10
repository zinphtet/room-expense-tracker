import 'react-native-url-polyfill/auto';
import {screenNames} from './src/constants';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/signup';
import useGetSession from './src/hooks/getSession';
import HomeScreen from './src/screens/home';
import RoomScreen from './src/screens/room';
import ProfileScreen from './src/screens/profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from './src/constants/colors';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// const Stack = createS
export default function App() {
  const {session} = useGetSession();
  const isLoggedIn = session?.user;
  return (
    <NavigationContainer>
      {!isLoggedIn && (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={screenNames.login} component={LoginScreen} />
          <Stack.Screen name={screenNames.signup} component={SignUpScreen} />
        </Stack.Navigator>
      )}
      {isLoggedIn && (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === screenNames.home) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === screenNames.room) {
                iconName = focused ? 'account-group' : 'account-group-outline';
              } else if (route.name === screenNames.profile) {
                iconName = focused
                  ? 'account-settings'
                  : 'account-settings-outline';
              }

              // You can return any component that you like here!
              return <Icon name={iconName!} size={30} color={color} />;
            },
            tabBarActiveTintColor: colors.primaryColor,
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarStyle: {
              paddingTop: 10,
              paddingBottom: 10,
            },
            tabBarShowLabel: false,
          })}>
          <Tab.Screen name={screenNames.home} component={HomeScreen} />
          <Tab.Screen name={screenNames.room} component={RoomScreen} />
          <Tab.Screen name={screenNames.profile} component={ProfileScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

import 'react-native-url-polyfill/auto';
// import './src/lib/gesture-handler';
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
import theme from './src/constants/theme';
import {ThemeProvider} from 'styled-components/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Toast, ToastProvider} from 'react-native-toast-notifications';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3F8782', // Replace with your desired color
    accent: '#fff', // Optional: Change the accent color too
  },
};
// const Stack = createS
export default function App() {
  const {session} = useGetSession();
  const isLoggedIn = session?.user;
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <PaperProvider theme={customTheme}>
          <SafeAreaProvider>
            <ToastProvider>
              <NavigationContainer>
                {!isLoggedIn && (
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                    }}>
                    <Stack.Screen
                      name={screenNames.login}
                      component={LoginScreen}
                    />
                    <Stack.Screen
                      name={screenNames.signup}
                      component={SignUpScreen}
                    />
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
                          iconName = focused
                            ? 'account-group'
                            : 'account-group-outline';
                        } else if (route.name === screenNames.profile) {
                          iconName = focused
                            ? 'account-settings'
                            : 'account-settings-outline';
                        }

                        // You can return any component that you like here!
                        return (
                          <Icon name={iconName!} size={30} color={color} />
                        );
                      },
                      tabBarActiveTintColor: theme.colors.primary,
                      tabBarInactiveTintColor: 'gray',
                      headerShown: false,
                      tabBarStyle: {
                        paddingTop: 10,
                        paddingBottom: 10,
                      },
                      tabBarShowLabel: false,
                    })}>
                    <Tab.Screen
                      name={screenNames.home}
                      component={HomeScreen}
                    />
                    <Tab.Screen
                      name={screenNames.room}
                      component={RoomScreen}
                    />
                    <Tab.Screen
                      name={screenNames.profile}
                      component={ProfileScreen}
                    />
                  </Tab.Navigator>
                )}
              </NavigationContainer>
            </ToastProvider>
          </SafeAreaProvider>
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

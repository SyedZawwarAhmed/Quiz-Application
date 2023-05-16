/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {globalStyles} from './globalStyles';
import Quiz from './components/Quiz';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProfile from './components/User/UserProfile';
import UserListScreen from './screens/UserListScreen';
import PassedUserListScreen from './screens/PassedUserListScreen';
import FailedUserListScreen from './screens/FailedUserListScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  const userTabIcon = () => (
    <Icon name={'user'} size={25} color={globalStyles.darkPurple} />
  );
  const passedUserTabIcon = () => (
    <Icon name={'check'} size={25} color={globalStyles.darkPurple} />
  );
  const failedUserTabIcon = () => (
    <Icon name={'times'} size={25} color={globalStyles.darkPurple} />
  );
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarIconStyle: {
          color: 'black',
        },
        tabBarLabelStyle: {
          color: globalStyles.darkPurple,
        },
        headerStyle: {
          backgroundColor: globalStyles.darkPurple,
        },
        headerTitleStyle: {
          color: globalStyles.white,
        },
        headerTintColor: globalStyles.white,
        // headerShown: false
      })}>
      <Tab.Screen
        name="UsersTab"
        component={UserListScreen}
        options={{
          headerTitle: 'Users',
          tabBarLabel: 'Users',
          tabBarIcon: userTabIcon,
        }}
      />
      <Tab.Screen
        name="PassedUsersTab"
        component={PassedUserListScreen}
        options={{
          headerTitle: 'Passed',
          tabBarLabel: 'Passed',
          tabBarIcon: passedUserTabIcon,
        }}
      />
      <Tab.Screen
        name="FailedUsersTab"
        component={FailedUserListScreen}
        options={{
          headerTitle: 'Failed',
          tabBarLabel: 'Failed',
          tabBarIcon: failedUserTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: globalStyles.darkPurple,
          },
          headerTitleStyle: {
            color: globalStyles.white,
          },
          headerTintColor: globalStyles.white,
        }}>
        <Stack.Screen
          name="Users"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Profile" component={UserProfile} />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppWrapper;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {globalStyles} from '../../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserListScreen from '../../screens/UserListScreen';
import PassedUserListScreen from '../../screens/PassedUserListScreen';
import FailedUserListScreen from '../../screens/FailedUserListScreen';

export const BottomTabs = () => {
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

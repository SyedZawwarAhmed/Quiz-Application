/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {NavigationContainer} from '@react-navigation/native';
import {globalStyles} from './globalStyles';
import Quiz from './components/Quiz';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProfile from './components/User/UserProfile';
import {BottomTabs} from './navigation/BottomTabs';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
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

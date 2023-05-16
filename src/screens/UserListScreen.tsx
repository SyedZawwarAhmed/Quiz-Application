import React from 'react';
import UserList from '../components/User/UserList';

export default function UserListScreen({navigation, route}: any) {
  return <UserList status={'pending'} navigation={navigation} route={route} />;
}

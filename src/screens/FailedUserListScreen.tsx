import React from 'react';
import UserList from '../components/User/UserList';

export default function FailedUserListScreen({navigation, route}: any) {
  return <UserList status={'failed'} navigation={navigation} route={route} />;
}

import React from 'react';
import UserList from '../components/User/UserList';

export default function PassedUserListScreen({navigation, route}: any) {
  return <UserList status={'passed'} navigation={navigation} route={route} />;
}

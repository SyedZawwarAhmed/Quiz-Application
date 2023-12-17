import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import UserListItem from '../UserListItem';
import {
  fetchUsersRequest,
  selectUser,
  unselectUser,
} from '../store/user.actions';
import {globalStyles} from '../../../globalStyles';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';

function UserList({status, navigation}: any) {
  const dispatch = useDispatch();
  const usersState = useSelector((state: any) => state.users);
  const {users, loading, error, selectedUser} = usersState;

  const handleSelectUser = (
    userId: number,
    firstName: string,
    lastName: string,
    imageUrl: string,
    username: string,
  ): void => {
    dispatch(
      selectUser({
        userId,
        firstName,
        lastName,
        imageUrl,
        username,
      }),
    );
  };

  useEffect(() => {
    if (status === 'pending') {
      dispatch(fetchUsersRequest());
    }
  }, [dispatch, status]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(unselectUser());
    }
  }, [navigation, dispatch, isFocused]);

  useEffect(() => {
    if (selectedUser) {
      navigation.navigate('Profile', {
        userId: selectedUser.userId,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        imageUrl: selectedUser.imageUrl,
        username: selectedUser.username,
      });
    }
  }, [navigation, selectedUser]);

  if (loading) {
    return (
      <ActivityIndicator
        style={styles.loader}
        color={globalStyles.darkPurple}
        size="large"
      />
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {users
        ?.filter((user: any) => user.status === status)
        .map((user: any) => (
          <View key={user.id}>
            <UserListItem
              userId={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              username={user.username}
              age={user.age}
              imageUrl={user.image}
              gender={user.gender}
              onClick={handleSelectUser}
            />
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.lightPurple,
  },
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default UserList;

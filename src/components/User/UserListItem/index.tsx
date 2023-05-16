import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

interface UserListItemProps {
  userId: number;
  firstName: string;
  lastName: string;
  age: number;
  imageUrl: string;
  gender: string;
  username: string;
  onClick: Function;
}
export default function UserListItem({
  userId,
  firstName,
  lastName,
  age,
  imageUrl,
  gender,
  username,
  onClick,
}: UserListItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() =>
        // onContainerPress(userId, firstName, lastName, imageUrl, username)
        onClick(userId, firstName, lastName, imageUrl, username)
      }>
      <Image style={styles.avatar} source={{uri: imageUrl}} />
      <View>
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.age}>
          Age {age}
          {'   '}
          <Icon name={gender} size={15} color={globalStyles.darkPurple} />
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: globalStyles.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 60,
    marginTop: -10,
    overflow: 'hidden',
  },
  name: {
    fontSize: 16,
    color: globalStyles.darkPurple,
    marginBottom: 5,
  },
  age: {
    color: globalStyles.grey,
  },
});

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyles} from '../../../globalStyles';
import {useSelector} from 'react-redux';

export default function UserProfile({navigation, route}: any) {
  const onTakeQuizPress = () => {
    navigation.navigate('Quiz');
  };

  const {users, selectedUser} = useSelector((state: any) => state.users);
  const selectedUserDetails = users.find(
    (user: any) => user.id === selectedUser?.userId,
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: route.params.imageUrl}} style={styles.image} />
      </View>
      <Text style={styles.name}>
        {route.params.firstName} {route.params.lastName}
      </Text>
      <Text style={styles.username}>@{route.params.username}</Text>
      <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={styles.detailHeader}>Maiden Name</Text>
          <Text style={styles.detailValue}>
            {selectedUserDetails?.maidenName}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailHeader}>Email</Text>
          <Text style={styles.detailValue}>{selectedUserDetails?.email}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailHeader}>Age</Text>
          <Text style={styles.detailValue}>{selectedUserDetails?.age}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailHeader}>Gender</Text>
          <Text style={styles.detailValue}>{selectedUserDetails?.gender}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailHeader}>City</Text>
          <Text style={styles.detailValue}>
            {selectedUserDetails?.address.city}
          </Text>
        </View>
        {selectedUserDetails.status === 'passed' ||
        selectedUserDetails.status === 'failed' ? (
          <View style={styles.detail}>
            <Text style={styles.detailHeader}>Status</Text>
            <Text
              style={[
                styles.detailValue,
                selectedUserDetails.status === 'passed'
                  ? styles.passed
                  : styles.failed,
              ]}>
              {selectedUserDetails.status}
            </Text>
          </View>
        ) : null}
        <View style={styles.detail}>
          <Text style={styles.detailHeader}>Number of attempts</Text>
          <Text style={styles.detailValue}>
            {selectedUserDetails?.numberOfAttempts}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.takeQuizButton}
        activeOpacity={0.7}
        onPress={() => onTakeQuizPress()}>
        <Text style={styles.takeQuizText}>Take Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  name: {
    color: globalStyles.darkPurple,
    fontSize: 26,
    fontWeight: '700',
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageContainer: {
    margin: 15,
    width: 100,
    height: 100,
    borderRadius: 75,
    overflow: 'hidden',
    backgroundColor: globalStyles.lightGrey,
  },
  username: {
    color: globalStyles.purple,
    fontWeight: '600',
    marginBottom: 20,
  },
  takeQuizButton: {
    backgroundColor: globalStyles.darkPurple,
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  takeQuizText: {
    color: globalStyles.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 5,
    borderWidth: 1,
    borderColor: globalStyles.lightGrey,
    borderRadius: 10,
    padding: 16,
    marginBottom: 'auto',
  },
  detail: {
    padding: 8,
    marginVertical: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  detailHeader: {
    color: globalStyles.darkPurple,
    textAlign: 'center',
  },
  detailValue: {
    color: globalStyles.purple,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  statusTag: {
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    textAlign: 'center',
    width: '100%',
    borderRadius: 10,
  },
  passed: {
    color: 'green',
    borderColor: 'green',
    textTransform: 'capitalize',
  },
  failed: {
    color: 'red',
    borderColor: 'red',
    textTransform: 'capitalize',
  },
});

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../../globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  moveUserToFailed,
  moveUserToPassed,
  updateUserNumberOfAttempts,
  updateUserScore,
} from '../../User/store/user.actions';
import {StackActions} from '@react-navigation/native';

interface QuestionProps {
  question: string;
  options: string[];
  answer: string;
  questionNumber: number;
  numberOfQuestions: number;
  onNextQuestion: () => void;
  navigation: any;
}

export default function Question({
  question,
  options,
  answer,
  questionNumber,
  numberOfQuestions,
  onNextQuestion,
  navigation,
}: QuestionProps) {
  const dispatch = useDispatch();

  const popAction = StackActions.pop(1);

  const {users, selectedUser} = useSelector((state: any) => state.users);
  const selectedUserDetails = users.find(
    (user: any) => user.id === selectedUser.userId,
  );

  const onFinish = () => {
    const percentage = (selectedUserDetails.score / numberOfQuestions) * 100;
    if (percentage >= 70) {
      dispatch(moveUserToPassed(selectedUser.userId));
    } else {
      dispatch(moveUserToFailed(selectedUser.userId));
    }
    dispatch(updateUserNumberOfAttempts(selectedUser.userId));
    navigation.dispatch(popAction);
  };

  const [selectedOption, setSelectedOption] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>
          Question {questionNumber} of {numberOfQuestions}
        </Text>
        <Text style={styles.question}>{question}</Text>
        <View>
          {options.map((option: string) => (
            <Pressable
              key={option}
              style={
                selectedOption !== option
                  ? styles.option
                  : [styles.option, styles.selectedOption]
              }
              onPress={() => setSelectedOption(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      {!(questionNumber === numberOfQuestions) ? (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (selectedOption === answer) {
              dispatch(updateUserScore(selectedUser.userId));
            }
            onNextQuestion();
          }}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.nextButton} onPress={onFinish}>
          <Text style={styles.nextButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.darkPurple,
    height: '100%',
    padding: 10,
  },
  questionContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  questionNumber: {
    color: globalStyles.purple,
    textAlign: 'center',
    margin: 15,
  },
  question: {
    color: globalStyles.white,
    fontSize: 25,
    textAlign: 'center',
    height: 150,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  option: {
    backgroundColor: globalStyles.white,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  selectedOption: {
    borderWidth: 5,
    marginVertical: 5,
    borderColor: globalStyles.purple,
  },
  optionText: {
    color: globalStyles.darkPurple,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  nextButton: {
    borderColor: globalStyles.white,
    borderWidth: 2,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  nextButtonText: {
    color: globalStyles.white,
    textAlign: 'center',
  },
});

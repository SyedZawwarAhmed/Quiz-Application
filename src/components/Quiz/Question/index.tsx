import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
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
import {quizQuestions} from '../questions';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  const [score, setScore] = useState(0);
  const incrementScore = () => {
    if (selectedOption === answer) {
      setScore(score + 1);
    }
  };

  const onFinish = () => {
    incrementScore();
    dispatch(updateUserScore({userId: selectedUser.userId, score}));
    const percentage = (score / numberOfQuestions) * 100;
    if (percentage >= 70) {
      dispatch(moveUserToPassed(selectedUser.userId));
    } else {
      dispatch(moveUserToFailed(selectedUser.userId));
    }
    dispatch(updateUserNumberOfAttempts(selectedUser.userId));
    setModalVisible(true);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

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
            incrementScore();
            onNextQuestion();
          }}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.nextButton} onPress={onFinish}>
          <Text style={styles.nextButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Icon
                name={
                  selectedUserDetails.status === 'passed' ? 'check' : 'times'
                }
                size={100}
                color={
                  selectedUserDetails.status === 'passed'
                    ? globalStyles.green
                    : globalStyles.red
                }
              />
            </View>
            <Text style={styles.modalStatus}>
              You {selectedUserDetails.status} the quiz!
            </Text>
            <Text style={styles.modalScore}>
              Score {score} / {quizQuestions.length}
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.dispatch(popAction);
              }}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalScore: {
    marginBottom: 15,
    textAlign: 'center',
    color: globalStyles.purple,
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: globalStyles.darkPurple,
    display: 'flex',
    width: 100,
  },
  modalButtonText: {
    color: globalStyles.white,
    fontSize: 20,
    textAlign: 'center',
  },
  modalStatus: {
    fontSize: 26,
    marginBottom: 15,
    color: globalStyles.darkPurple,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

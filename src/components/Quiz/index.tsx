import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Question from './Question';
import {quizQuestions} from './questions';
import {
  moveUserToFailed,
  moveUserToPassed,
  updateUserNumberOfAttempts,
  updateUserScore,
} from '../User/store/user.actions';
import {useDispatch, useSelector} from 'react-redux';

export default function Quiz(props: any) {
  const {navigation} = props;
  const dispatch = useDispatch();

  const {users, selectedUser} = useSelector((state: any) => state.users);

  function shuffle(arr: Array<any>) {
    const array = [...arr];
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const quizQuestionsShuffled = useMemo(() => {
    return shuffle(quizQuestions);
  }, []);

  const numberOfQuestions = useMemo(() => {
    return quizQuestionsShuffled.length;
  }, [quizQuestionsShuffled]);
  const currentQuestion = quizQuestionsShuffled[questionNumber];

  const [modalVisible, setModalVisible] = useState(false);

  const onNextQuestion = useCallback((): void => {
    setQuestionNumber(questionNumber + 1);
  }, [questionNumber]);

  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const incrementScore = useCallback(() => {
    if (currentQuestion && selectedOption === currentQuestion.answer) {
      setScore((previousScore: number) => previousScore + 1);
    }
  }, [currentQuestion, selectedOption]);

  const handleNext = () => {
    incrementScore();
    onNextQuestion();
    setSelectedOption('');
    reset();
  };

  const intervalRef = useRef<any>(null);

  const handleOk = () => {
    dispatch(updateUserScore({userId: selectedUser.userId, score: score}));
    const percentage = (score / numberOfQuestions) * 100;
    if (percentage >= 60) {
      dispatch(moveUserToPassed(selectedUser.userId));
    } else {
      dispatch(moveUserToFailed(selectedUser.userId));
    }
  };

  const onFinish = () => {
    stop();
    incrementScore();
    handleOk();
    dispatch(updateUserNumberOfAttempts(selectedUser.userId));
    setModalVisible(true);
  };

  const [timer, setTimer] = useState(60);

  const reset = () => {
    setTimer(60);
  };

  const start = useCallback(() => {
    setTimer(prev => {
      if (prev === -1) {
        stop();
        return -1;
      }
      return prev - 1;
    });
  }, []);

  const interval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      start();
    }, 1000);
  }, [start]);

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    interval();

    if (timer === 0 && questionNumber === numberOfQuestions - 1) {
      onFinish();
      stop();
    } else if (timer === -1 && questionNumber < numberOfQuestions - 1) {
      handleNext();
    }

    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, questionNumber, numberOfQuestions, interval]);

  useEffect(() => {
    if (questionNumber === numberOfQuestions - 1) {
      handleOk();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    <Question
      questionNumber={questionNumber + 1}
      numberOfQuestions={numberOfQuestions}
      question={currentQuestion?.question}
      options={currentQuestion?.options}
      answer={currentQuestion?.answer}
      onNextQuestion={onNextQuestion}
      navigation={navigation}
      timer={timer}
      users={users}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      selectedUser={selectedUser}
      handleNext={handleNext}
      onFinish={onFinish}
      score={score}
    />
  );
}

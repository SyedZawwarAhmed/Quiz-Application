import React, {useMemo, useState} from 'react';
import Question from './Question';
import {quizQuestions} from './questions';

export default function Quiz({navigation}: any) {
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

  const quizQuestionsShuffled = useMemo(() => {
    return shuffle(quizQuestions);
  }, []);
  const numberOfQuestions = useMemo(() => {
    return quizQuestionsShuffled.length;
  }, [quizQuestionsShuffled]);

  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const onNextQuestion = (): void => {
    setQuestionNumber(questionNumber + 1);
  };

  return (
    <Question
      questionNumber={questionNumber + 1}
      numberOfQuestions={numberOfQuestions}
      question={quizQuestionsShuffled[questionNumber].question}
      options={quizQuestionsShuffled[questionNumber].options}
      answer={quizQuestionsShuffled[questionNumber].answer}
      onNextQuestion={onNextQuestion}
      navigation={navigation}
    />
  );
}

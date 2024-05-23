import { FC, useState } from "react";
import { Answer, Question, ReducerAction } from "../shared/interfaces";
import { Actions } from "../shared/enums";
import { QUESTIONS_AMOUNT } from "../shared/constants";
import QuestionView from "../views/QuestionView";

interface Props {
  dispatch: React.Dispatch<ReducerAction>;
  questions: Question[];
}

const QuestionsLayout: FC<Props> = ({ questions, dispatch }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const submitAnswer = (answer: Answer) => {
    setCurrentQuestionIndex((prev) => prev + 1);
    dispatch({
      type: Actions.ADD_ANSWER,
      value: {
        answer: {
          ...answer,
          category: questions[currentQuestionIndex].category,
        },
      },
    });
  };

  const renderQuestions = () => {
    if (currentQuestionIndex < QUESTIONS_AMOUNT) {
      const { type, question, correct_answer, incorrect_answers } =
        questions[currentQuestionIndex];

      return (
        <QuestionView
          question={question}
          correct_answer={correct_answer}
          incorrect_answers={incorrect_answers}
          submitAnswer={submitAnswer}
          type={type}
        />
      );
    }
  };
  return <>{renderQuestions()}</>;
};

export default QuestionsLayout;

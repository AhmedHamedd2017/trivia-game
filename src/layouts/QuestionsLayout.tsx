import { FC, useState } from "react";
import { Answer, Question, ReducerAction } from "../shared/interfaces";
import MCQuestion from "../views/MCQuestion";
import TFQuestion from "../views/TFQuestion";
import { Actions } from "../shared/enums";
import { QUESTIONS_AMOUNT } from "../shared/constants";

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

      if (type === "multiple")
        return (
          <MCQuestion
            question={question}
            correct_answer={correct_answer}
            incorrect_answers={incorrect_answers}
            submitAnswer={submitAnswer}
          />
        );
      if (type === "boolean")
        return (
          <TFQuestion
            question={question}
            correct_answer={correct_answer}
            incorrect_answers={incorrect_answers}
            submitAnswer={submitAnswer}
          />
        );
    }
  };
  return <>{renderQuestions()}</>;
};

export default QuestionsLayout;

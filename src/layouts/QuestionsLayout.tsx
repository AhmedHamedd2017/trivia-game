import { FC, useState } from "react";
import { Question } from "../shared/interfaces";
import MCQuestion from "../views/MCQuestion";
import TFQuestion from "../views/TFQuestion";

interface Props {
  questions: Question[];
}

const QuestionsLayout: FC<Props> = ({ questions }) => {
  const [currentQuestionIndex, _] = useState(0);

  console.log("questions", questions);
  const renderQuestions = () => {
    const { type, question, correct_answer, incorrect_answers } =
      questions[currentQuestionIndex];

    if (type === "multiple")
      return (
        <MCQuestion
          question={question}
          correct_answer={correct_answer}
          incorrect_answers={incorrect_answers}
        />
      );
    if (type === "boolean")
      return (
        <TFQuestion
          question={question}
          correct_answer={correct_answer}
          incorrect_answers={incorrect_answers}
        />
      );
  };
  return <>{renderQuestions()}</>;
};

export default QuestionsLayout;

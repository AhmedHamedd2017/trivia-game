import { FC, useState } from "react";
import { H1Elem } from "../shared/styledComponents";
import GridContainer from "../components/containers/GridContainer";
import FlexContainer from "../components/containers/FlexContainer";
import BaseButton from "../components/buttons/BaseButton";
import KeyboardInstructions from "../components/shared/KeyboardInstructions";
import { Answer, Instruction } from "../shared/interfaces";

interface Props {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  submitAnswer: (arg0: Answer) => void;
}

const instructions: Instruction[] = [
  {
    buttons: ["S"],
    description: "kip",
  },
  {
    buttons: ["N"],
    description: "ext",
  },
  {
    buttons: ["T", "F"],
    description: "Answer",
  },
];

//TODO: REFCATOR MCQ AND TFQ TO A SINGLE COMPONENT
const TFQuestion: FC<Props> = ({
  question,
  correct_answer,
  incorrect_answers,
  submitAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const renderAnswers = () => {
    const sortedAnswers = [correct_answer, ...incorrect_answers]
      .sort()
      .reverse();

    return sortedAnswers.map((answer, index) => {
      return (
        <BaseButton
          text={answer}
          keyboardKey={answer.charAt(0)}
          key={`${index}_tfq_answer`}
          isSelected={answer === selectedAnswer}
          onClick={() => setSelectedAnswer(answer)}
        />
      );
    });
  };

  const getAnswerType = () => {
    if (selectedAnswer === correct_answer) return "correct";
    else return "incorrect";
  };

  const submitHandler = (isSkipped?: boolean) => {
    setSelectedAnswer("");
    submitAnswer({
      type: isSkipped ? "skipped" : getAnswerType(),
      time: 0,
    });
  };

  return (
    <>
      <H1Elem>{question}</H1Elem>
      <GridContainer repeat={2} isColumn={true}>
        {renderAnswers() || []}
      </GridContainer>
      <FlexContainer>
        <BaseButton
          text="skip"
          keyboardKey="S"
          onClick={() => submitHandler(true)}
        />
        <BaseButton
          text="next"
          keyboardKey="N"
          disabled={!selectedAnswer}
          onClick={() => submitHandler()}
        />
      </FlexContainer>
      <KeyboardInstructions instructions={instructions} />
    </>
  );
};

export default TFQuestion;

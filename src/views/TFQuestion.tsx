import { FC } from "react";
import { H1Elem } from "../shared/styledComponents";
import GridContainer from "../components/containers/GridContainer";
import FlexContainer from "../components/containers/FlexContainer";
import BaseButton from "../components/buttons/BaseButton";
import KeyboardInstructions from "../components/shared/KeyboardInstructions";
import { Instruction } from "../shared/interfaces";

interface Props {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
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

const TFQuestion: FC<Props> = ({
  question,
  correct_answer,
  incorrect_answers,
}) => {
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
        />
      );
    });
  };

  return (
    <>
      <H1Elem>{question}</H1Elem>
      <GridContainer repeat={2} isColumn={true}>
        {renderAnswers() || []}
      </GridContainer>
      <FlexContainer>
        <BaseButton text="skip" keyboardKey="S" />
        <BaseButton text="next" keyboardKey="N" />
      </FlexContainer>
      <KeyboardInstructions instructions={instructions} />
    </>
  );
};

export default TFQuestion;

import { FC, useEffect, useState } from "react";
import { H1Elem } from "../shared/styledComponents";
import { shuffle } from "../utils/helpers";
import BaseButton from "../components/buttons/BaseButton";
import GridContainer from "../components/containers/GridContainer";
import styled from "styled-components";
import KeyboardInstructions from "../components/shared/KeyboardInstructions";
import { Instruction } from "../shared/interfaces";

interface Props {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const FlexContainer = styled.div`
  display: flex;
  gap: 5px;
`;

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
    buttons: ["1", "2", "3", "4"],
    description: "Answer",
  },
];

const MCQuestion: FC<Props> = ({
  question,
  correct_answer,
  incorrect_answers,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    setShuffledAnswers(shuffle([correct_answer, ...incorrect_answers]));
  }, []);

  const renderAnswers = () => {
    return shuffledAnswers.map((answer, index) => {
      return (
        <BaseButton
          text={answer}
          keyboardKey={index.toString()}
          key={`${index}_mcq_answer`}
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

export default MCQuestion;

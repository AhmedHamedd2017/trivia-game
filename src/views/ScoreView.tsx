import { FC } from "react";
import styled from "styled-components";
import BaseButton from "../components/buttons/BaseButton";
import { Answer } from "../shared/interfaces";
import { getFormattedCountdown } from "../utils/helpers";
import GridContainer from "../components/containers/GridContainer";

interface Props {
  username: string;
  answers: Answer[];
}

const UsernameElem = styled.h1`
  color: white;
  margin: 0;
`;

const ScoreContaier = styled.div`
  background-color: var(--background-color);
  padding: 10px;
`;

const ScoreView: FC<Props> = ({ username, answers }) => {
  console.log(answers);

  const getTotalTime = () => {
    return answers.reduce(
      (accumulator, currentValue) => accumulator + currentValue.time,
      0
    );
  };

  return (
    <>
      <UsernameElem>Congratulations {username}, you made it! 🎉</UsernameElem>
      <GridContainer isColumn={true} repeat={2}>
        <ScoreContaier>{`You finished in ${getFormattedCountdown(
          getTotalTime()
        )}`}</ScoreContaier>
        <ScoreContaier>2mon</ScoreContaier>
      </GridContainer>
      <BaseButton text="New Game" />
    </>
  );
};

export default ScoreView;

import { FC } from "react";
import styled from "styled-components";
import BaseButton from "../components/buttons/BaseButton";
import { Answer } from "../shared/interfaces";
import { getFormattedCountdown } from "../utils/helpers";
import GridContainer from "../components/containers/GridContainer";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";

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
  border-radius: 8px;
`;

const ScoreView: FC<Props> = ({ username, answers }) => {
  const getTotalTime = () => {
    return answers.reduce(
      (accumulator, currentValue) => accumulator + currentValue.time,
      0
    );
  };

  const getPieChartData = () => {
    const series = Array(3).fill(0);
    const labels = ["correct", "incorrect", "skipped"];

    answers.forEach((answer) => {
      const seriesIndex = labels.findIndex((label) => label === answer.type);

      if (seriesIndex !== undefined)
        series[seriesIndex] = series[seriesIndex] + 1;
    });

    return {
      series,
      labels,
    };
  };

  return (
    <>
      <UsernameElem>Congratulations {username}, you made it! 🎉</UsernameElem>
      <GridContainer isColumn={true} repeat={2}>
        <ScoreContaier>{`You finished in ${getFormattedCountdown(
          getTotalTime()
        )}`}</ScoreContaier>
        <ScoreContaier>
          <PieChart {...getPieChartData()} />
        </ScoreContaier>
        <ScoreContaier>
          <LineChart seriesData={answers.map((answer) => answer.time)} />
        </ScoreContaier>
      </GridContainer>
      <BaseButton text="New Game" />
    </>
  );
};

export default ScoreView;

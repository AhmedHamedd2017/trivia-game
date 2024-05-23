import { FC } from "react";
import styled from "styled-components";
import BaseButton from "../components/buttons/BaseButton";
import { Answer } from "../shared/interfaces";
import { getFormattedCountdown } from "../utils/helpers";
import GridContainer from "../components/containers/GridContainer";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";
import StackedBarChart from "../components/charts/StackedBarChart";

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

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const TimeHeader = styled.h2`
  color: var(--brand-blue);
  text-transform: uppercase;
  margin: 0;
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

  const getStackedBarChartData = () => {
    const categoriesMap = new Map();
    const categories: string[] = [];
    const positiveValues: number[] = [];
    const negativeValues: number[] = [];

    answers.forEach((answer) => {
      const { category, type } = answer;
      const currentCategory = categoriesMap.get(category);
      const isPositive = type === "correct";

      if (currentCategory) {
        categoriesMap.set(category, {
          positiveValues: currentCategory.positiveValues + Number(isPositive),
          negativeValues: currentCategory.negativeValues + Number(!isPositive),
        });
      } else
        categoriesMap.set(category, {
          positiveValues: Number(isPositive),
          negativeValues: Number(!isPositive),
        });
    });

    [...categoriesMap.entries()].map(([key, value]) => {
      categories.push(key);
      positiveValues.push(value.positiveValues);
      negativeValues.push(value.negativeValues);
    });

    return { categories, positiveValues, negativeValues };
  };

  getStackedBarChartData();
  return (
    <>
      <UsernameElem>Congratulations {username}, you made it! 🎉</UsernameElem>
      <GridContainer isColumn={true} repeat={2}>
        <ScoreContaier>
          <TimeHeader>You finished in 🔥</TimeHeader>
          <TimeHeader>{getFormattedCountdown(getTotalTime())}</TimeHeader>
        </ScoreContaier>
        <ScoreContaier>
          <PieChart {...getPieChartData()} />
        </ScoreContaier>
        <ScoreContaier>
          <StackedBarChart {...getStackedBarChartData()} />
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

import { FC, useLayoutEffect, useEffect, useState } from "react";
import { H1Elem } from "../shared/styledComponents";
import { decodeHtmlText, shuffle } from "../utils/helpers";
import BaseButton from "../components/buttons/BaseButton";
import GridContainer from "../components/containers/GridContainer";
import KeyboardInstructions from "../components/shared/KeyboardInstructions";
import { Answer, Instruction } from "../shared/interfaces";
import { QuestionDifficulty, QuestionType } from "../shared/types";
import FlexContainer from "../components/containers/FlexContainer";
import CountdownTimer from "../components/timers/CountdownTimer";

interface Props {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  submitAnswer: (arg0: Answer) => void;
  type: QuestionType;
  difficulty: QuestionDifficulty;
}

const getCountdownInitialValue = (difficulty: QuestionDifficulty) => {
  switch (difficulty) {
    case "easy":
      return 90;
    case "medium":
      return 60;
    case "hard":
      return 30;
  }
};

const QuestionView: FC<Props> = ({
  question,
  correct_answer,
  incorrect_answers,
  submitAnswer,
  type,
  difficulty,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [time, setTime] = useState(-1);

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
      buttons: type === "multiple" ? ["1", "2", "3", "4"] : ["T", "F"],
      description: "Answer",
    },
  ];

  useEffect(() => {
    if (!time) {
      submitHandler(true);
    }
  }, [time]);

  useLayoutEffect(() => {
    setTime(getCountdownInitialValue(difficulty));

    if (type === "multiple")
      setShuffledAnswers(shuffle([correct_answer, ...incorrect_answers]));
  }, [correct_answer, incorrect_answers, type, difficulty]);

  const renderMCAnswers = () => {
    return shuffledAnswers.map((answer, index) => {
      const decodedAnswer = decodeHtmlText(answer);
      return (
        <BaseButton
          text={decodedAnswer}
          keyboardKey={index.toString()}
          key={`${index}_mcq_answer`}
          isSelected={decodedAnswer === selectedAnswer}
          onClick={() => setSelectedAnswer(decodedAnswer)}
        />
      );
    });
  };

  const renderTFAnswers = () => {
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
    const countdownInitialValue = getCountdownInitialValue(difficulty);
    setSelectedAnswer("");
    submitAnswer({
      type: isSkipped ? "skipped" : getAnswerType(),
      time: countdownInitialValue - time,
    });
  };

  return (
    <>
      <FlexContainer
        direction="column"
        styles="justify-content: center; align-items: center; gap: 0;"
      >
        <CountdownTimer time={time} setTime={setTime} />
        <H1Elem>{decodeHtmlText(question)}</H1Elem>
      </FlexContainer>
      <GridContainer repeat={2} isColumn={true}>
        {type === "multiple" ? renderMCAnswers() : renderTFAnswers() || []}
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

export default QuestionView;

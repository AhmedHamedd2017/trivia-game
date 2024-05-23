import { FC, useEffect, useState } from "react";
import { H1Elem } from "../shared/styledComponents";
import { decodeHtmlText, shuffle } from "../utils/helpers";
import BaseButton from "../components/buttons/BaseButton";
import GridContainer from "../components/containers/GridContainer";
import KeyboardInstructions from "../components/shared/KeyboardInstructions";
import { Answer, Instruction } from "../shared/interfaces";
import { QuestionType } from "../shared/types";
import FlexContainer from "../components/containers/FlexContainer";

interface Props {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  submitAnswer: (arg0: Answer) => void;
  type: QuestionType;
}

const QuestionView: FC<Props> = ({
  question,
  correct_answer,
  incorrect_answers,
  submitAnswer,
  type,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

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
    if (type === "multiple")
      setShuffledAnswers(shuffle([correct_answer, ...incorrect_answers]));
  }, [correct_answer, incorrect_answers, type]);

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
    setSelectedAnswer("");
    submitAnswer({
      type: isSkipped ? "skipped" : getAnswerType(),
      time: 0,
    });
  };

  return (
    <>
      <H1Elem>{decodeHtmlText(question)}</H1Elem>
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

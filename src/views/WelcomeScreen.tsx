import { FC, useState } from "react";
import { Instruction, ReducerAction } from "../shared/interfaces";
import GridContainer from "../components/containers/GridContainer";
import KeyboardInstructions from "../components/shared/KeyboardInstructions";
import styled from "styled-components";
import BaseButton from "../components/buttons/BaseButton";
import { Actions } from "../shared/enums";

interface Props {
  dispatch: React.Dispatch<ReducerAction>;
}

const InputElem = styled.input`
  background: transparent;
  border: none;
  border-radius: 10px;
  outline: none;
  color: #fff;
  width: 250px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  transition: all 0.2s;

  &:focus {
    border: 0.5px solid var(--brand-green-light);
  }
`;

const instructions: Instruction[] = [
  {
    buttons: ["E"],
    description: "asy",
  },
  {
    buttons: ["M"],
    description: "edium",
  },
  {
    buttons: ["H"],
    description: "ard",
  },
  {
    buttons: ["P"],
    description: "lay",
  },
];

const options = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const WelcomeScreen: FC<Props> = ({ dispatch }) => {
  const [username, setUsername] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");

  const renderDifficultyBtns = (): JSX.Element[] => {
    return options.map(({ label, value }, index) => {
      return (
        <BaseButton
          key={`${value}_${index}`}
          text={label}
          keyboardKey={label.charAt(0)}
          isSelected={difficulty === value}
          onClick={() => setDifficulty(value)}
        />
      );
    });
  };

  return (
    <>
      <InputElem
        placeholder="type your name here..."
        value={username}
        onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
      />
      <GridContainer repeat={3} isColumn>
        {renderDifficultyBtns()}
      </GridContainer>
      <BaseButton
        text="Play"
        keyboardKey="P"
        disabled={!username || !difficulty}
        onClick={() =>
          dispatch({
            type: Actions.UPDATE_USER_PREFERENCE,
            value: {
              difficulty,
              username,
            },
          })
        }
      />
      <KeyboardInstructions instructions={instructions} />
    </>
  );
};

export default WelcomeScreen;

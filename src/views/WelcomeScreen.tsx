import { FC } from "react";
import {
  GameReducerState,
  Instruction,
  ReducerAction,
} from "../shared/interfaces";
import GridContainer from "../components/containers/GridContainer";
import KeyboardInstructions from "../components/shared/KeyboardInstructions";
import styled from "styled-components";
import BaseButton from "../components/buttons/BaseButton";
import { Actions } from "../shared/reducerActions";

interface Props {
  state: GameReducerState;
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

const WelcomeScreen: FC<Props> = ({ state, dispatch }) => {
  const renderDifficultyBtns = (): JSX.Element[] => {
    return options.map(({ label, value }, index) => {
      return (
        <BaseButton
          key={`${value}_${index}`}
          text={label}
          keyboardKey={label.charAt(0)}
          isSelected={state.difficulty === value}
          onClick={() =>
            dispatch({
              type: Actions.UPDATE_DIFFICULTY,
              value,
            })
          }
        />
      );
    });
  };

  return (
    <>
      <InputElem
        placeholder="type your name here..."
        value={state.username}
        onChange={(e) =>
          dispatch({
            type: Actions.UPDATE_USERNAME,
            value: (e.target as HTMLInputElement).value,
          })
        }
      />
      <GridContainer repeat={3} isColumn>
        {renderDifficultyBtns()}
      </GridContainer>
      <BaseButton
        text="Play"
        keyboardKey="P"
        disabled={!state.username || !state.difficulty}
      />
      <KeyboardInstructions instructions={instructions} />
    </>
  );
};

export default WelcomeScreen;

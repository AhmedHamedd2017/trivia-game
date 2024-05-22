import { Instruction } from "../shared/interfaces";
import GridContainer from "../components/containers/GridContainer";
import KeyboardInstructions from "../components/shared/KeyboardInstructions";
import styled from "styled-components";
import BaseButton from "../components/buttons/BaseButton";

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

const WelcomeScreen = () => {
  return (
    <>
      <InputElem placeholder="type your name here..." />
      <GridContainer repeat={3} isColumn>
        <BaseButton text="Easy" keyboardKey="E" />
        <BaseButton text="Medium" keyboardKey="M" />
        <BaseButton text="Hard" keyboardKey="H" />
      </GridContainer>
      <BaseButton text="Play" keyboardKey="P" />
      <KeyboardInstructions instructions={instructions} />
    </>
  );
};

export default WelcomeScreen;

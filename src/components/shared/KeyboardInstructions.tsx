import React, { FC } from "react";
import KeyboardKey from "./KeyboardKey";
import { Instruction } from "../../shared/interfaces";
import styled from "styled-components";
import FlexContainer from "../containers/FlexContainer";

interface Props {
  instructions: Instruction[];
}

const InstructionContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50px;
`;
const GreenSpan = styled.span`
  color: var(--brand-green-light);
`;

const KeyboardInstructions: FC<Props> = ({ instructions }) => {
  const renderIntrusctions = () => {
    const renderInstructionButtons = (
      buttons: (string | React.ReactElement)[],
      outerIndex: number
    ) => {
      // Index should not be used as a key, just for demo purposes
      return buttons.map((button, index) => {
        return (
          <KeyboardKey
            key={`inner_btn_${index}_${outerIndex}`}
            styles="margin-right: 1px; color: var(--brand-green-light)"
          >
            {button}
          </KeyboardKey>
        );
      });
    };

    return instructions.map((instruction, index) => {
      // Index should not be used as a key, just for demo purposes
      return (
        <span style={{ maxWidth: "max-content" }} key={`outter_btn_${index}`}>
          {renderInstructionButtons(instruction.buttons, index)}
          <GreenSpan>{instruction.description}</GreenSpan>
        </span>
      );
    });
  };

  return (
    <InstructionContainer>
      <FlexContainer>{renderIntrusctions()}</FlexContainer>
    </InstructionContainer>
  );
};

export default KeyboardInstructions;

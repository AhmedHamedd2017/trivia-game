import { FC } from "react";
import styled from "styled-components";
import KeyboardKey from "../shared/KeyboardKey";

const ButtonElem = styled.button<{ $backgroundColor: string; $color: string }>`
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color};
  border: none;
  font-size: 20px;
  opacity: 100%;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  padding: 12px 56px;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    opacity: 80%;
  }
`;

interface Props {
  text: string;
  backgroundColor?: string;
  color?: string;
  keyboardKey?: React.ReactElement | string;
}

const Button: FC<Props> = ({
  text,
  backgroundColor = "var(--brand-green)",
  color = "var(--brand-blue)",
  keyboardKey,
}) => {
  return (
    <ButtonElem $backgroundColor={backgroundColor} $color={color}>
      {keyboardKey && <KeyboardKey>{keyboardKey}</KeyboardKey>}
      {text}
    </ButtonElem>
  );
};

export default Button;

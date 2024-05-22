import { FC } from "react";
import styled from "styled-components";
import KeyboardKey from "../shared/KeyboardKey";
import { StyledComponent } from "../../shared/interfaces";

const ButtonElem = styled.button<{
  $backgroundColor: string;
  $color: string;
  $styles?: string;
}>`
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

  ${(props) => props.$styles || ""}
`;

interface Props extends StyledComponent {
  text: string;
  backgroundColor?: string;
  color?: string;
  keyboardKey?: React.ReactElement | string;
}

const BaseButton: FC<Props> = ({
  text,
  backgroundColor = "var(--brand-green)",
  color = "var(--brand-blue)",
  keyboardKey,
  ...props
}) => {
  return (
    <ButtonElem
      $backgroundColor={backgroundColor}
      $color={color}
      $styles={props.styles}
    >
      {keyboardKey && <KeyboardKey>{keyboardKey}</KeyboardKey>}
      {text}
    </ButtonElem>
  );
};

export default BaseButton;

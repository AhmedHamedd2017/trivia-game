import { FC } from "react";
import styled from "styled-components";
import { StyledComponent } from "../../shared/interfaces";

const ButtonElem = styled.button<{
  $backgroundColor: string;
  $color: string;
  $styles?: string;
  $isSelected?: boolean;
  $disabled?: boolean;
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

  &:focus {
    outline: 0;
  }

  &:hover {
    opacity: 80%;
  }

  ${(props) =>
    props.$disabled
      ? "background-color: #cccccc; color: #666666; opacity: 80%; pointer-events:none;"
      : ""}

  ${(props) =>
    props.$isSelected
      ? "opacity: 80%; box-shadow: 0 -5px 0 var(--brand-yellow) inset"
      : ""}

  ${(props) => props.$styles || ""}
`;

interface Props extends StyledComponent, React.HTMLProps<HTMLButtonElement> {
  text: string;
  backgroundColor?: string;
  color?: string;
  keyboardKey?: React.ReactElement | string;
  isSelected?: boolean;
}

const BaseButton: FC<Props> = ({
  text,
  backgroundColor = "var(--brand-green)",
  color = "var(--brand-blue)",
  // keyboardKey,
  isSelected,
  ...props
}) => {
  return (
    <ButtonElem
      $backgroundColor={backgroundColor}
      $color={color}
      $styles={props.styles}
      $isSelected={isSelected}
      $disabled={props.disabled}
      onClick={props.onClick}
    >
      {/* {keyboardKey && <KeyboardKey>{keyboardKey}</KeyboardKey>} */}
      {text}
    </ButtonElem>
  );
};

export default BaseButton;

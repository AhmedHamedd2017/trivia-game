import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  children: string | React.ReactElement;
  styles?: string;
}

const KeyboardElem = styled.span<{ $styles?: string }>`
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  padding: 0.1em 0.5em;
  margin-right: 0.5em;
  ${(props) => props.$styles || ""}
`;

const KeyboardKey: FC<Props> = ({ children, styles }) => {
  return <KeyboardElem $styles={styles}>{children}</KeyboardElem>;
};

export default KeyboardKey;

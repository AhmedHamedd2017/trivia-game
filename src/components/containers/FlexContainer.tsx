import { FC } from "react";
import { StyledComponent } from "../../shared/interfaces";
import styled from "styled-components";

interface Props extends StyledComponent {
  children: React.ReactElement[];
  direction?: string;
}

const FlexContainerElem = styled.div<{
  $direction?: number | string;
  $styles?: string;
}>`
  display: flex;
  ${(props) => (props.$direction ? `flex-direction: ${props.$direction}` : "")}
  gap: 15px;

  ${(props) => props.$styles || ""}
`;

const FlexContainer: FC<Props> = ({ children }) => {
  return <FlexContainerElem>{children}</FlexContainerElem>;
};

export default FlexContainer;

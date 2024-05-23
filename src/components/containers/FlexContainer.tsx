import { FC } from "react";
import { StyledComponent } from "../../shared/interfaces";
import styled from "styled-components";

interface Props extends StyledComponent {
  children: React.ReactElement | React.ReactElement[];
  direction?: string;
  styles?: string;
}

const FlexContainerElem = styled.div<{
  $direction?: number | string;
  $styles?: string;
}>`
  display: flex;
  ${(props) => (props.$direction ? `flex-direction: ${props.$direction};` : "")}
  gap: 15px;

  ${(props) => props.$styles || ""}
`;

const FlexContainer: FC<Props> = ({ children, direction, styles }) => {
  return (
    <FlexContainerElem $direction={direction} $styles={styles}>
      {children}
    </FlexContainerElem>
  );
};

export default FlexContainer;

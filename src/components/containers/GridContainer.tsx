import React, { FC } from "react";
import styled from "styled-components";
import { StyledComponent } from "../../shared/interfaces";

interface Props extends StyledComponent {
  children: React.ReactElement[];
  isColumn?: boolean;
  repeat: number | string;
}

const GridContainerElem = styled.div<{
  $isColumn?: boolean;
  $repeat: number | string;
  $styles?: string;
}>`
display: grid;
grid-template-${(props) => (props.$isColumn ? "columns" : "rows")}: repeat(${(
  props
) => props.$repeat}, minmax(0, 1fr));
column-gap: 30px;
row-gap: 30px;
grid-auto-rows: 1fr;
${(props) => props.$styles || ""}
`;

const GridContainer: FC<Props> = ({ children, isColumn, repeat, ...props }) => {
  return (
    <GridContainerElem
      $isColumn={isColumn}
      $repeat={repeat}
      $styles={props.styles}
    >
      {children}
    </GridContainerElem>
  );
};

export default GridContainer;

import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactElement[];
  isColumn?: boolean;
  repeat: number | string;
}

const GridContainerElem = styled.div<{
  $isColumn?: boolean;
  $repeat: number | string;
}>`
display: grid;
grid-template-${(props) => (props.$isColumn ? "columns" : "rows")}: repeat(${(
  props
) => props.$repeat}, minmax(0, 1fr));
column-gap: 30px;
row-gap: 30px;
grid-auto-rows: 1fr;
`;

const GridContainer: FC<Props> = ({ children, isColumn, repeat }) => {
  return (
    <GridContainerElem $isColumn={isColumn} $repeat={repeat}>
      {children}
    </GridContainerElem>
  );
};

export default GridContainer;

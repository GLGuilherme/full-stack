import React from "react";
import { TableCell, TableCellProps } from "@mui/material";
import styled from "@emotion/styled";

interface MMTableCellInterface {
  width: number;
  bgColor?: string;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderRight?: number;
  notBorderBottom?: boolean;
  children?: React.ReactNode;
}

export const MMTableCell: React.FC<MMTableCellInterface & TableCellProps> = ({
  width,
  bgColor,
  borderTopLeftRadius,
  borderTopRightRadius,
  notBorderBottom,
  children,
  ...props
}) => {
  const StdTableCell = styled(TableCell)`
    border-bottom: ${(props: { notBorderBottom?: boolean }) =>
      props?.notBorderBottom && "none"};
  `;

  return (
    <StdTableCell
      width={width}
      sx={{
        backgroundColor: bgColor,
        borderTopLeftRadius,
        borderTopRightRadius,
      }}
      notBorderBottom={notBorderBottom}
      {...props}
    >
      {children}
    </StdTableCell>
  );
};

import React from "react";
import { TableCell } from "@mui/material";

interface MMTableCellInterface {
  width: number;
  bgColor?: string;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderRight?: number;
  children?: React.ReactNode;
}

export const MMTableCell: React.FC<MMTableCellInterface> = ({
  width,
  bgColor,
  borderTopLeftRadius,
  borderTopRightRadius,
  children,
  ...props
}) => {
  return (
    <TableCell
      width={width}
      sx={{
        backgroundColor: bgColor,
        borderTopLeftRadius,
        borderTopRightRadius,
      }}
      {...props}
    >
      {children}
    </TableCell>
  );
};

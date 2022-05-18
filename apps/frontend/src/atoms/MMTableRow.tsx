import React from "react";
import { TableRow } from "@mui/material";

interface MMTableRowInterface {
  children: React.ReactNode;
}

export const MMTableRow: React.FC<MMTableRowInterface> = ({ children }) => {
  return <TableRow>{children}</TableRow>;
};

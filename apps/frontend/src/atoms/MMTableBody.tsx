import React from "react";
import { TableBody } from "@mui/material";

interface MMTableBodyInterface {
  children: React.ReactNode;
}

export const MMTableBody: React.FC<MMTableBodyInterface> = ({ children }) => {
  return <TableBody>{children}</TableBody>;
};

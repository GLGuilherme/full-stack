import React from "react";
import { TableHead } from "@mui/material";

interface MMTableHeadInterface {
  children: React.ReactNode;
}

export const MMTableHead: React.FC<MMTableHeadInterface> = ({
  children,
  ...props
}) => {
  return <TableHead {...props}>{children}</TableHead>;
};

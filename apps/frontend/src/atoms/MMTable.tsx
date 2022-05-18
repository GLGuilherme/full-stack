import React from "react";
import { Table } from "@mui/material";

interface MMTableInterface {
  stickHeader?: boolean;
  children: React.ReactNode;
}

export const MMTable: React.FC<MMTableInterface> = ({
  stickHeader,
  children,
  ...props
}) => {
  return (
    <Table stickyHeader={stickHeader} {...props}>
      {children}
    </Table>
  );
};

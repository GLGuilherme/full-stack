import React from "react";
import { Typography } from "@mui/material";

interface MMTitleTableHeaderInterface {
  children: string;
}

export const MMTitleTableHeader: React.FC<MMTitleTableHeaderInterface> = ({
  children,
}) => {
  return (
    <Typography fontSize={14} fontWeight={800}>
      {children}
    </Typography>
  );
};

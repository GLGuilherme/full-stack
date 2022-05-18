import { Typography } from "@mui/material";
import React from "react";

interface MMTypographInterface {
  children: string;
}

export const MMTypography: React.FC<MMTypographInterface> = ({ children }) => {
  return <Typography>{children}</Typography>;
};

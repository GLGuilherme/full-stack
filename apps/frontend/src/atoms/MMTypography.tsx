import { Typography, TypographyProps } from "@mui/material";
import React from "react";

interface MMTypographInterface {
  children?: string;
}

export const MMTypography: React.FC<MMTypographInterface & TypographyProps> = ({
  children,
  ...props
}) => {
  return <Typography {...props}>{children}</Typography>;
};

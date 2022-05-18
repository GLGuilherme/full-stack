import React from "react";
import { MMTypography } from "./MMTypography";

interface MMHelperTextInterface {
  text?: string;
}

export const MMHelperText: React.FC<MMHelperTextInterface> = ({ text }) => {
  return (
    <MMTypography position="absolute" color="error" fontSize="small">
      {text}
    </MMTypography>
  );
};

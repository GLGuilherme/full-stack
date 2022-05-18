import React from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

interface MMSearchFieldInterface {
  label: string;
  error?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
}

export const MMSearchField: React.FC<MMSearchFieldInterface> = ({
  label,
  onChange,
  error,
  helperText,
}) => {
  let keywordTimeout: NodeJS.Timeout;

  const handleChangeThrottle = (value: string, limit: number) => {
    clearTimeout(keywordTimeout);
    if (!value) onChange("");

    keywordTimeout = setTimeout(() => {
      onChange(value);
    }, limit);
  };

  return (
    <Box width={1}>
      <TextField
        fullWidth
        label={label}
        helperText={helperText}
        error={error}
        onChange={(e) => handleChangeThrottle(e.target.value, 300)}
      />
    </Box>
  );
};

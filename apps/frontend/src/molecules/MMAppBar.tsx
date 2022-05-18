import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { MMIconButton } from "../atoms/MMIconButton";
import { MMTypography } from "../atoms/MMTypography";
import { Box } from "@mui/system";

interface MMAppBarInterface {}

export const MMAppBar: React.FC<MMAppBarInterface> = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box mr={2}>
          <MMIconButton type="menu" color="inherit" onClick={() => {}} />
        </Box>

        <MMTypography>Full-Stack Test (CPF)</MMTypography>
      </Toolbar>
    </AppBar>
  );
};

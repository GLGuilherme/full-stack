import React from "react";
import { Box, BoxProps, useTheme } from "@mui/material";
import styled from "@emotion/styled";

interface MMBoxScrollBarInterface {
  children: React.ReactNode;
}

export const MMBoxScrollBar: React.FC<MMBoxScrollBarInterface & BoxProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();

  const StdBox = styled(Box)`
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track-piece {
      background-color: transparent;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    ::-webkit-scrollbar-thumb:vertical {
      height: 5px;
      border-radius: 20px;
      background-color: ${theme.palette.grey[400]};
    }
  `;
  return <StdBox {...props}>{children}</StdBox>;
};

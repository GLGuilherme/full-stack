import React from "react";
import { Box, BoxProps } from "@mui/material";
import styled from "@emotion/styled";

interface MMBoxScrollBarInterface {
  children: React.ReactNode;
}

export const MMBoxScrollBar: React.FC<MMBoxScrollBarInterface & BoxProps> = ({
  children,
  ...props
}) => {
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
      background-color: #3333;
    }
  `;
  return <StdBox {...props}>{children}</StdBox>;
};

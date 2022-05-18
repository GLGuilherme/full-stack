import React from "react";
import { CircularProgress, IconButton, IconButtonProps } from "@mui/material";
import { AddCircle, Delete, Menu } from "@mui/icons-material";

interface MMIconButtonInterface {
  type: "add" | "delete" | "menu";
  color: IconButtonProps["color"];
  onClick: () => void;
  isLoading?: boolean;
}

export const MMIconButton: React.FC<MMIconButtonInterface> = ({
  type,
  color,
  isLoading,
  onClick,
}) => {
  const typeIconButton = {
    add: <AddCircle />,
    delete: <Delete />,
    menu: <Menu />,
  };

  return (
    <IconButton color={color} onClick={onClick} size="large">
      {isLoading ? <CircularProgress size={20} /> : typeIconButton[type]}
    </IconButton>
  );
};

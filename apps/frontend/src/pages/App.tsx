import React from "react";
import { Box } from "@mui/material";
import { MMAppBar } from "../molecules/MMAppBar";
import { MMCpf } from "../organisms/MMCpf";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

export const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <Box height="100vh">
          <MMAppBar />

          <MMCpf />
        </Box>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

import React, { useState } from "react";
import { Box } from "@mui/material";
import { MMSearchField } from "../atoms/MMSearchField";
import { MMIconButton } from "../atoms/MMIconButton";
import { useMutation, useQueryClient } from "react-query";
import { http } from "../utils/http";
import { useSnackbar } from "notistack";

interface MMAddCpfInterface {
  error: {
    message: string;
    status: number;
    type: string;
  } | void;
  onChange: (value: string) => void;
}

export const MMAddCpf: React.FC<MMAddCpfInterface> = ({ error, onChange }) => {
  const queryClient = useQueryClient();
  const [cpf, setCpf] = useState<string>();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: addCpf, isLoading } = useMutation(
    () => http("cpf", { method: "POST", body: { cpf } }),
    {
      onSuccess: () => {
        enqueueSnackbar("CPF successfully added.", {
          variant: "success",
          autoHideDuration: 2000,
        });
        queryClient.invalidateQueries("cpfList");
      },
      onError: (error: any) => {
        enqueueSnackbar(error?.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      },
    }
  );

  const handleChangeCpf = (value: string) => {
    setCpf(value);
    onChange(value);
  };

  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="space-between"
      alignItems="flex-start"
      width={400}
      height={50}
    >
      <Box flex={1} mr={2}>
        <MMSearchField
          label="Search CPF"
          onChange={handleChangeCpf}
          error={!!error}
          helperText={error?.message}
        />
      </Box>

      <Box>
        <MMIconButton
          type="add"
          color="success"
          onClick={() => addCpf()}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

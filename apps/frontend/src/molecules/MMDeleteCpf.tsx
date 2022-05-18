import React from "react";
import { Box } from "@mui/system";
import { MMIconButton } from "../atoms/MMIconButton";
import { MMTableCell } from "../atoms/MMTableCell";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import { http } from "../utils/http";

interface MMDeleteCpfInterface {
  cpf: string;
  notBorderBottom?: boolean;
}

export const MMDeleteCpf: React.FC<MMDeleteCpfInterface> = ({
  cpf,
  notBorderBottom,
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: deleteCpf, isLoading: isLoadingDelete } = useMutation(
    (data: string) =>
      http(`cpf/${data}`, { method: "DELETE", body: { cpf: data } }),
    {
      onSuccess: () => {
        enqueueSnackbar("CPF successfully deleted.", {
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

  return (
    <MMTableCell width={100} notBorderBottom={notBorderBottom}>
      <Box display="flex" flex={1} justifyContent="flex-end">
        <MMIconButton
          type="delete"
          color="error"
          onClick={() => deleteCpf(cpf)}
          isLoading={isLoadingDelete}
        />
      </Box>
    </MMTableCell>
  );
};

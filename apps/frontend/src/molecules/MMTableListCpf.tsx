import React, { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { MMBoxScrollBar } from "../atoms/MMBoxScrollBar";
import { MMTable } from "../atoms/MMTable";
import { MMTableHead } from "../atoms/MMTableHead";
import { MMTableCell } from "../atoms/MMTableCell";
import { MMTitleTableHeader } from "../atoms/MMTitleTableHeader";
import { MMTableBody } from "../atoms/MMTableBody";
import { MMTableRow } from "../atoms/MMTableRow";
import { MMIconButton } from "../atoms/MMIconButton";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";
import { http } from "../utils/http";

interface MMTableListCpfInterface {
  rows: Array<{
    cpf: string;
    createdAt: string;
  }>;
  isLoading: boolean;
}

export const MMTableListCpf: React.FC<MMTableListCpfInterface> = ({
  rows,
  isLoading = true,
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [cpf, setCpf] = useState<string>();

  const { mutate: deleteCpf, isLoading: isLoadingDelete } = useMutation(
    (data: string) =>
      http(`cpf/${data}`, { method: "DELETE", body: { cpf: data } }),
    {
      onSuccess: () => {
        enqueueSnackbar("CPF successfully deleted.", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setCpf("");
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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <MMBoxScrollBar display="flex" overflow={isLoading ? "hidden" : "auto"}>
        <MMTable stickHeader>
          <MMTableHead>
            <MMTableCell width={100} bgColor="#f5f5f5" borderTopLeftRadius={15}>
              <MMTitleTableHeader>CPF</MMTitleTableHeader>
            </MMTableCell>

            <MMTableCell width={100} bgColor="#f5f5f5">
              <MMTitleTableHeader>Created at</MMTitleTableHeader>
            </MMTableCell>

            <MMTableCell
              width={100}
              bgColor="#f5f5f5"
              borderTopRightRadius={15}
            />
          </MMTableHead>

          <MMTableBody>
            {isLoading
              ? Array(10)
                  .fill(1)
                  .map(() => (
                    <MMTableRow>
                      <MMTableCell width={100}>
                        <Skeleton variant="rectangular" height={50} />
                      </MMTableCell>

                      <MMTableCell width={100}>
                        <Skeleton variant="rectangular" height={50} />
                      </MMTableCell>

                      <MMTableCell width={100}>
                        <Skeleton variant="rectangular" height={50} />
                      </MMTableCell>
                    </MMTableRow>
                  ))
              : rows.map((item) => (
                  <MMTableRow key={item.cpf}>
                    <MMTableCell width={100}>{item.cpf}</MMTableCell>

                    <MMTableCell width={100}>{item.createdAt}</MMTableCell>

                    <MMTableCell width={100}>
                      <Box display="flex" flex={1} justifyContent="flex-end">
                        <MMIconButton
                          type="delete"
                          color="error"
                          onClick={() => {
                            setCpf(item.cpf);
                            deleteCpf(item.cpf);
                          }}
                          isLoading={cpf === item.cpf && isLoadingDelete}
                        />
                      </Box>
                    </MMTableCell>
                  </MMTableRow>
                ))}
          </MMTableBody>
        </MMTable>
      </MMBoxScrollBar>
    </Box>
  );
};

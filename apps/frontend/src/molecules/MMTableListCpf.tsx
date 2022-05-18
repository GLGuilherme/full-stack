import React from "react";
import { Box, Skeleton, useTheme } from "@mui/material";
import { MMBoxScrollBar } from "../atoms/MMBoxScrollBar";
import { MMTable } from "../atoms/MMTable";
import { MMTableHead } from "../atoms/MMTableHead";
import { MMTableCell } from "../atoms/MMTableCell";
import { MMTitleTableHeader } from "../atoms/MMTitleTableHeader";
import { MMTableRow } from "../atoms/MMTableRow";
import { MMTableBody } from "../atoms/MMTableBody";
import { MMDeleteCpf } from "./MMDeleteCpf";

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
  const theme = useTheme();

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
            <MMTableCell
              width={100}
              bgColor={theme.palette.grey[200]}
              borderTopLeftRadius={15}
            >
              <MMTitleTableHeader>CPF</MMTitleTableHeader>
            </MMTableCell>

            <MMTableCell width={100} bgColor={theme.palette.grey[200]}>
              <MMTitleTableHeader>Created at</MMTitleTableHeader>
            </MMTableCell>

            <MMTableCell
              width={100}
              bgColor={theme.palette.grey[200]}
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
              : rows.map((item, index) => (
                  <MMTableRow key={item.cpf}>
                    <MMTableCell
                      width={100}
                      notBorderBottom={rows.length - 1 === index}
                    >
                      {item.cpf}
                    </MMTableCell>

                    <MMTableCell
                      width={100}
                      notBorderBottom={rows.length - 1 === index}
                    >
                      {item.createdAt}
                    </MMTableCell>

                    <MMDeleteCpf
                      cpf={item.cpf}
                      notBorderBottom={rows.length - 1 === index}
                    />
                  </MMTableRow>
                ))}
          </MMTableBody>
        </MMTable>
      </MMBoxScrollBar>
    </Box>
  );
};

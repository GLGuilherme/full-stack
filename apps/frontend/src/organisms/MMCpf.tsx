import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Box, useTheme } from "@mui/material";
import { MMTableListCpf } from "../molecules/MMTableListCpf";
import { MMAddCpf } from "../molecules/MMAddCpf";
import { useQuery } from "react-query";
import { http } from "../utils/http";

const Container = styled(Box)`
  height: calc(100vh - 64px);
`;

interface MMCpfInterface {}

export const MMCpf: React.FC<MMCpfInterface> = () => {
  const theme = useTheme();
  const [cpf, setCpf] = useState<string>();
  const [error, setError] = useState<{
    message: string;
    status: number;
    type: string;
  } | void>();

  const { data: cpfList, isLoading } = useQuery(
    ["cpfList", cpf],
    () => http(`cpf${cpf ? `/${cpf}` : ""}`),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      onSuccess: () => {
        setError();
      },
      onError: (error: any) => {
        setError(error);
      },
    }
  );

  const rows = useMemo(() => {
    if (!cpfList) {
      return [];
    }

    if (cpfList?.items?.length) {
      return cpfList.items;
    } else {
      return [cpfList];
    }
  }, [cpfList]);

  return (
    <Container
      display="flex"
      flex={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box mb={5}>
        <MMAddCpf onChange={setCpf} error={error} />
      </Box>

      <Box
        width={800}
        height={600}
        bgcolor={theme.palette.grey[200]}
        borderRadius={5}
      >
        <Box height="100%">
          <MMTableListCpf rows={rows} isLoading={isLoading} />
        </Box>
      </Box>
    </Container>
  );
};

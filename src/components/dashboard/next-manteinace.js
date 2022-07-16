import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Paper,
} from "@mui/material";
import SeverityPill from "../severity-pill";
import { map } from "lodash";

export default function NextManteinace(props) {
  const { callback } = props;

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...props}>
      <CardHeader title="Proximos mantenimientos" />
      <Box>
        <TableContainer sx={{ maxHeight: 350 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Cliente</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Placa Vehiculo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(callback.slice(page * limit, page * limit + limit), (data) => {
                const fechaActual = new Date().getTime();
                const fechaMa = new Date(data.date_mantenimiento).getTime();
                const fechadiffMa = (fechaMa - fechaActual) / (1000 * 60 * 60 * 24);

                return (
                  <TableRow hover key={data.id}>
                    <TableCell align="center">{data.nombre}</TableCell>
                    <TableCell align="center">
                      <SeverityPill color={(fechadiffMa <= 10 && "warning") || "success"}>
                        {data.date_mantenimiento}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="center">{data.placa}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        component="div"
        page={page}
        count={callback.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15]}
        labelRowsPerPage="Filas por página"
      />
    </Card>
  );
}

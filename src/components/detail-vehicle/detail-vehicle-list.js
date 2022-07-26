import React from "react";
import dynamic from "next/dynamic";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from "@mui/material";
import { map, orderBy } from "lodash";

const RowCustom = dynamic(() => import("./RowCustom"), {
  loading: () => (
    <TableRow>
      <TableCell colSpan={6}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
        </Box>
      </TableCell>
    </TableRow>
  ),
});

export default function DetailVehicleList(props) {
  const { data, reload } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Fecha de ingreso</TableCell>
            <TableCell>Garantia</TableCell>
            <TableCell align="right">Proxima revision</TableCell>
            <TableCell align="right">Proximo mantenimiento</TableCell>
            <TableCell align="right">Cambio filtro</TableCell>
            <TableCell align="center">Actualizar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(orderBy(data, ["date_ingreso"], ["desc"]), (row) => (
            <RowCustom key={row.id} row={row} reload={reload} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

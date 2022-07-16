import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { destroyImageRepuesto } from "src/Api/RepuestoApi";
import { map } from "lodash";

export default function ListProductTable(props) {
  const { items, callback } = props;

  async function removeItems(item) {
    callback(items.filter((i) => i.product !== item.product));
    let response;

    const array = JSON.parse(item.imgsRepuestos);

    map(array, async (i) => {
      response = await destroyImageRepuesto(i.id);
      // console.log(response.message);
    });
  }

  return (
    <>
      <Typography variant="h6" color="textPrimary">
        Productos agregados{" "}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Precio Venta</TableCell>
              <TableCell>Precio Compra</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(items, (item, index) => (
              <TableRow key={index}>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.precio_venta}</TableCell>
                <TableCell>{item.precio_compra}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      removeItems(item);
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

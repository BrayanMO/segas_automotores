import React from "react";
import { Card, Box, Grid, CardContent, Button, CircularProgress } from "@mui/material";

import dynamic from "next/dynamic";
import { Form, Formik } from "formik";
import { InputField } from "../FormFields";
import * as Yup from "yup";
import { updateProductById, deleteProductById } from "src/Api/RepuestoApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CarouselImages = dynamic(() => import("./CarouselImages"));

function DetailProduct({ infoProduct }) {
  console.log(infoProduct);
  const { query, push } = useRouter();

  const collage = JSON.parse(infoProduct.imgs_repuestos);

  function initialValues() {
    return {
      nombre: `${infoProduct.nombre}`,
      precio_costo: `${infoProduct.precio_costo}`,
      precio_venta: `${infoProduct.precio_venta}`,
      stock: `${infoProduct.stock}`,
      marca: `${infoProduct.marca}`,
    };
  }

  function validationSchema() {
    return Yup.object().shape({
      nombre: Yup.string().required("Se requiere el nombre del producto"),
      stock: Yup.string()
        .required("Se requiere el stock del producto")
        .test("Positive", "El stock debe ser un numero positivo", (value) => {
          return value > 0;
        }),
      marca: Yup.string().required("Se requiere la marca del repuesto"),
      precio_costo: Yup.string()
        .required("Se requiere el precio de compra")
        .test("Positive", "El precio de compra debe ser un numero decimal Ej. 10.5", (value) => {
          return value > 0;
        }),
      precio_venta: Yup.string()
        .required("Se requiere el precio de venta")
        .test("Positive", "El precio de venta debe ser un numero decimal Ej. 10.5", (value) => {
          return value > 0;
        }),
    });
  }

  async function _handleSubmit(values, actions) {
    console.log(query.product);

    const product = {
      id: query.product,
      nombre: values.nombre,
      precio_costo: values.precio_costo,
      precio_venta: values.precio_venta,
      stock: values.stock,
      marca: values.marca,
    };

    const response = await updateProductById(product);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  async function _handleDelete(id) {
    const response = await deleteProductById(id);

    if (response.status === 200) {
      toast.success(response.data.message);
      push("/products");
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Card>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CarouselImages collage={collage} />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box>
            <Formik
              initialValues={initialValues()}
              validationSchema={validationSchema()}
              onSubmit={_handleSubmit}
            >
              {(formik) => (
                <Form>
                  <Card>
                    <CardContent>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={12}>
                            <InputField name="nombre" label="Nombre producto" fullWidth />
                          </Grid>
                          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <InputField name="marca" label="Marca" fullWidth />
                            <InputField name="stock" label="Stock" type="number" fullWidth />
                          </Grid>
                          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <InputField
                              name="precio_costo"
                              label="Precio de compra"
                              type="number"
                              fullWidth
                            />
                            <InputField
                              name="precio_venta"
                              label="Precio de venta"
                              type="number"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant="contained"
                              color="error"
                              fullWidth
                              onClick={() => _handleDelete(query.product)}
                            >
                              Dar de baja
                            </Button>
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: 3 }}>
                          <Button variant="contained" color="primary" type="submit" fullWidth>
                            Actualizar
                          </Button>
                        </Box>
                        {formik.isSubmitting && (
                          <CircularProgress
                            size={24}
                            sx={{ position: "absolute", top: "50%", left: "50%" }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DetailProduct;

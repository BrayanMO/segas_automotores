import React, { useRef, useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { InputField } from "src/components/FormFields";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DashboardLayout } from "src/layout/dashboard-layout";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { getProveedores, uploadImageRepuesto, addProduct } from "src/Api/RepuestoApi";
import { size } from "lodash";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const MultipleImagePreview = dynamic(() =>
  import("src/components/product/Register/MultipleImagePreview")
);

const ListProductTable = dynamic(() => import("src/components/product/Register/ListProductTable"));

export default function RegisterProduct() {
  const imageRepuesto = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [listProveedores, setListProveedores] = useState([]);
  const [itemsProducts, setItemsProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getProveedores();
      setListProveedores(response);
    })();
  }, []);

  //console.log(listProveedores);

  function initialValues() {
    return {
      product: "",
      stock: "",
      made: "",
      precio_compra: "",
      precio_venta: "",
      id_proveedor: "",
      imgsRepuestos: null,
    };
  }

  function validationSchema() {
    return Yup.object().shape({
      product: Yup.string().required("Se requiere el nombre del producto"),
      stock: Yup.string()
        .required("Se requiere el stock del producto")
        .test("Positive", "El stock debe ser un numero positivo", (value) => {
          return value > 0;
        }),
      made: Yup.string().required("Se requiere la marca del repuesto"),
      precio_compra: Yup.string()
        .required("Se requiere el precio de compra")
        .test("Positive", "El precio de compra debe ser un numero decimal Ej. 10.5", (value) => {
          return value > 0;
        }),
      precio_venta: Yup.string()
        .required("Se requiere el precio de venta")
        .test("Positive", "El precio de venta debe ser un numero decimal Ej. 10.5", (value) => {
          return value > 0;
        }),
      id_proveedor: Yup.string().required("Se requiere el proveedor"),
      imgsRepuestos: Yup.mixed()
        .nullable()
        .required("Se requieren las imagenes del producto")
        .test("len", `Solo permite 4 imagenes`, (val) => val && val.length === 4),
    });
  }

  async function _handleSubmit(values, actions) {
    const response = await uploadImageRepuesto("repuestos", values.imgsRepuestos);

    // console.log(JSON.stringify(response.data));

    const dataProcessed = {
      product: values.product,
      stock: values.stock,
      made: values.made,
      precio_compra: values.precio_compra,
      precio_venta: values.precio_venta,
      id_proveedor: values.id_proveedor,
      imgsRepuestos: JSON.stringify(response.data),
    };

    // console.log(dataProcessed);

    setItemsProducts([...itemsProducts, dataProcessed]);

    //limpio el array de imagenes seleccionadas para que nos las siga acoplando
    setSelectedFiles([]);

    actions.setSubmitting(false);
    actions.resetForm();
  }

  async function register() {
    console.log(itemsProducts);
    if (size(itemsProducts) > 0) {
      const response = await addProduct(itemsProducts);

      console.log(response);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/products");
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("No hay productos para registrar");
    }
  }

  const handleImageChange = (e, formik) => {
    //console.log(e.target.files);
    if (e.target.files) {
      formik.setFieldValue("imgsRepuestos", e.target.files);
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      //console.log("filesArray: ", filesArray);

      setSelectedFiles((imgs) => [...imgs, ...filesArray]);
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Registrar de repuestos | Template App</title>
      </Head>
      <Box
        component="main"
        sx={{ flexGrow: 1, alignItems: "top", display: "flex", minHeight: "100%" }}
      >
        <Container maxWidth="md">
          <Box sx={{ mt: 3, my: 2 }}>
            <Typography variant="h4" color="textPrimary">
              Registro de repuestos
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema()}
            onSubmit={_handleSubmit}
          >
            {(formik) => (
              <Form>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {/* Imagenes */}
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        border: "1px dashed rgb(45, 55, 72)",
                        borderRadius: 1,
                        outline: "none",
                        padding: 4,
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.04)",
                          cursor: "pointer",
                          opacity: 0.5,
                        },
                      }}
                    >
                      <input
                        ref={imageRepuesto}
                        accept=".png, .jpeg"
                        type="file"
                        autoComplete="off"
                        tabIndex="-1"
                        hidden
                        multiple
                        onChange={(evt) => {
                          handleImageChange(evt, formik);
                        }}
                      />

                      {formik.values.imgsRepuestos ? (
                        <MultipleImagePreview source={selectedFiles} />
                      ) : (
                        <ImageSearchIcon
                          sx={{
                            height: 100,
                            width: 100,
                          }}
                        />
                      )}
                      <Box sx={{ padding: 3 }}>
                        <Button onClick={() => imageRepuesto.current.click()}>
                          Selecciona las imagenes
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedFiles([]);
                            formik.setFieldValue("imgsRepuestos", null);
                          }}
                        >
                          Borrar imagenes
                        </Button>
                      </Box>
                    </Box>
                    <Box sx={{ color: "red" }}>
                      <ErrorMessage name="imgsRepuestos" />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    {/* Proveedor */}
                    <Autocomplete
                      id="id_proveedor"
                      freeSolo
                      name="id_proveedor"
                      options={listProveedores}
                      getOptionLabel={(option) => option.nombre}
                      onOpen={formik.handleBlur}
                      onChange={(event, newValue) => {
                        // console.log(newValue);
                        formik.setFieldValue(
                          "id_proveedor",
                          newValue !== null ? newValue.id : initialValues().id_proveedor
                        );
                      }}
                      renderInput={(params) => (
                        <InputField
                          label="Buscar Proveedor"
                          fullWidth
                          name="id_proveedor"
                          {...params}
                        />
                      )}
                    />

                    {/* Nombre de producto */}
                    <InputField name="product" label="Nombre" margin="normal" fullWidth />

                    {/* Stock - Marca */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <InputField
                        name="stock"
                        label="Stock"
                        margin="normal"
                        type="number"
                        fullWidth
                      />
                      <InputField name="made" label="Marca" margin="normal" fullWidth />
                    </Grid>

                    {/* Precios */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <InputField
                        name="precio_compra"
                        label="Precio Compra"
                        margin="normal"
                        fullWidth
                      />
                      <InputField
                        name="precio_venta"
                        label="Precio Venta"
                        margin="normal"
                        fullWidth
                      />
                    </Grid>

                    <Button variant="contained" type="submit" color="secondary" fullWidth>
                      Agregar producto
                    </Button>
                  </Grid>
                </Grid>

                {size(itemsProducts) > 0 && (
                  <Box mt={3}>
                    <ListProductTable items={itemsProducts} callback={setItemsProducts} />
                  </Box>
                )}

                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" color="primary" onClick={() => register()} fullWidth>
                    Registrar
                  </Button>
                </Box>
                {formik.isSubmitting && (
                  <CircularProgress
                    size={24}
                    sx={{ position: "absolute", top: "50%", left: "50%" }}
                  />
                )}
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
